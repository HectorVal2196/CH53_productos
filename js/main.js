const main = document.getElementsByTagName("main").item(0);
const URLMain = "https://fakestoreapi.com/products/";

function getData(){
    fetch(URLMain)
        .then((response)=>{
            console.log(response);
            response.json().then((res)=>{
                //console.log(res.length);
                //console.log(res[5].title);
                createCards(res);
            });
        })
        .catch((err)=>{
            main.insertAdjacentHTML("beforeend",
                `<div class="alert alert-danger" role="alert">
                    ${err.message}
                    </div>`);
        });
}// getData

getData();


function createCards(prods) {
    prods.forEach((res) => {
        main.insertAdjacentHTML("beforeend",
            `<div class="card mb-3" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src=${res.image} class="img-fluid rounded-start" alt=${res.title}>
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${res.title}</h5>
                    <p class="card-text">${res.description.split(" ").slice(0, 20).join(" ") + " ..."}
                    </p>
                    <p class="card-text"><small class="text-body-secondary">$${res.price}</small></p>
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Launch demo modal
                    </button>

                    <!-- Modal -->

                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">${res.title}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                          ${res.description} </br>
                          $${res.price}
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>`);
    });
}