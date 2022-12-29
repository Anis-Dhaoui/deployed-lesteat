window.onload = window.addEventListener("scroll", function() {
    let navArea = document.getElementById("navArea");
    if(navArea !== null){
        if (window.pageYOffset > 331) {
            navArea.classList.add("is-sticky");
        } else {
            if(navArea.classList.contains("is-sticky")){
                    navArea.classList.remove("is-sticky");
            }
        }
    }
    });
    