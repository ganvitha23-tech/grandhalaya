async function searchBook() {

let search = document.getElementById("searchInput").value;

if(search==""){
    alert("Enter Book Name");
    return;
}

let url = `https://openlibrary.org/search.json?q=${search}`;

let response = await fetch(url);

let data = await response.json();

let books = document.getElementById("books");

books.innerHTML="";

if(data.docs.length==0){
    books.innerHTML="<h2>No Books Found</h2>";
    return;
}

data.docs.slice(0,20).forEach(book=>{

let image="https://via.placeholder.com/200x300?text=No+Cover";

if(book.cover_i){
image=`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
}

books.innerHTML+=`

<div class="card">

<img src="${image}">

<h2>${book.title}</h2>

<p class="author">
Author :
${book.author_name ? book.author_name[0] : "Unknown"}
</p>

<p>
Published :
${book.first_publish_year || "Unknown"}
</p>

<p>
Category :
${book.subject ? book.subject[0] : "Not Available"}
</p>

<p>
⭐ Rating :
${Math.floor(Math.random()*2)+4}/5
</p>

<p class="desc">
${book.title} is one of the books available in the Open Library collection.
</p>

</div>

`;

});

}