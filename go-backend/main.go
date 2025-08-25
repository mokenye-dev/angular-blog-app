package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"
	"strings"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

// Post represents a blog post in the database.
type Post struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Date    string `json:"date"`
	Slug    string `json:"slug"`
	Content string `json:"content"`
}

var db *sql.DB

func main() {
	var err error
	db, err = sql.Open("sqlite3", "blog.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	createTable()

	http.HandleFunc("/posts", postsHandler)
	http.HandleFunc("/posts/create", createPostHandler)
	log.Println("Blog API is running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
func createTable() {
	sqlStmt := `
    CREATE TABLE IF NOT EXISTS posts (
        id      INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        title   TEXT,
        date    TEXT,
        slug    TEXT UNIQUE,
        content TEXT
    );`
	_, err := db.Exec(sqlStmt)
	if err != nil {
		log.Fatal(err)
	}
}
func createPostHandler(w http.ResponseWriter, r *http.Request) {
	// 1. Check the HTTP method.
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// 2. Parse the multipart form data.
	// The argument is the maximum memory to use for the form data.
	err := r.ParseMultipartForm(10 << 20) // 10 MB limit
	if err != nil {
		http.Error(w, "Failed to parse multipart form", http.StatusBadRequest)
		return
	}

	// 3. Extract the form values.
	title := r.FormValue("title")
	content := r.FormValue("content")
	slug := r.FormValue("slug")
	date := r.FormValue("date")

	// 4. Validate and sanitize the data.
	if title == "" || content == "" {
		http.Error(w, "Title and content fields are required", http.StatusBadRequest)
		return
	}

	// 5. Generate missing data (slug and date).
	if slug == "" {
		slug = strings.ToLower(strings.ReplaceAll(title, " ", "-"))
	}
	if date == "" {
		date = time.Now().Format(time.RFC3339)
	}

	// 6. Insert into the database.
	stmt, err := db.Prepare("INSERT INTO posts(title, date, slug, content) values(?, ?, ?, ?)")
	if err != nil {
		http.Error(w, "Failed to prepare statement", http.StatusInternalServerError)
		return
	}
	defer stmt.Close()

	_, err = stmt.Exec(title, date, slug, content)
	if err != nil {
		if strings.Contains(err.Error(), "UNIQUE constraint failed") {
			http.Error(w, "Slug already exists. Please provide a unique title.", http.StatusConflict)
			return
		}
		http.Error(w, "Failed to insert post", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	response := map[string]string{"message": "Post created successfully!"}
	json.NewEncoder(w).Encode(response)
	//w.Write([]byte("Post created successfully!"))
}
func postsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	w.Header().Set("Access-Control-Allow-Origin", "*")
	rows, err := db.Query("SELECT id, title, date, slug, content FROM posts")
	if err != nil {
		http.Error(w, "Failed to query posts", http.StatusInternalServerError)
		log.Println("Error querying posts:", err)
		return
	}
	defer rows.Close()

	var posts []Post
	for rows.Next() {
		var p Post
		if err := rows.Scan(&p.ID, &p.Title, &p.Date, &p.Slug, &p.Content); err != nil {
			http.Error(w, "Failed to scan posts", http.StatusInternalServerError)
			log.Println("Error scanning post:", err)
			return
		}
		posts = append(posts, p)
	}

	if err := rows.Err(); err != nil {
		http.Error(w, "Error iterating over rows", http.StatusInternalServerError)
		log.Println("Error iterating rows:", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(posts); err != nil {
		http.Error(w, "Failed to encode JSON", http.StatusInternalServerError)
		log.Println("Error encoding JSON:", err)
	}
}
