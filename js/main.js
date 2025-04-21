const main = document.getElementsByTagName("main").item(0);
const URLMain = "https://fakestoreapi.com/products/";
const mainProds = document.getElementById("mainProds");
const ulMenu = document.getElementById("ulMenu");

function getData(cat = "") {
    const options = { method: "GET" }; // ¡IMPORTANTE! Asegurate de declarar 'options'
    fetch(URLMain + cat, options)
        .then((response) => {
            response.json().then((res) => {
                createCards(res);
            });
        })
        .catch((err) => {
            main.insertAdjacentHTML("beforeend",
                `<div class="alert alert-danger" role="alert">
                    ${err.message}
                </div>`);
        });
} // getData

getData(""); // Llamada inicial para traer TODOS los productos

function getCategories() {
    const options = { method: "GET" };
    fetch(URLMain + "categories/", options)
        .then((response) => {
            response.json().then((res) => {
                console.log("categories: ", res);
                res.forEach(cat => {
                    ulMenu.insertAdjacentHTML("afterbegin",
                        `<li><a class="dropdown-item" style="cursor:pointer;" onclick="getData('category/${escape(cat)}')">${cat}</a></li> `
                    );
                });
            });
        })
        .catch((err) => {
            main.insertAdjacentHTML("beforeend",
                `<div class="alert alert-danger" role="alert">
                    ${err.message}
                </div>`);
        });
} // getCategories

getCategories();

function createCards(prods) {
    main.innerHTML = ""; // Limpia antes de insertar nuevas tarjetas
    prods.forEach((res, index) => {
        const modalId = `${index}`;

        main.insertAdjacentHTML("beforeend",
            `<div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src=${res.image} class="img-fluid rounded-start" alt="${res.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${res.title}</h5>
                            <p class="card-text">${res.description.split(" ").slice(0, 20).join(" ") + " ..."}</p>
                            <p class="card-text"><small class="text-body-secondary">$${res.price}</small></p>

                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modalId}">
                                Ver Detalles
                            </button>

                            <!-- Modal -->
                            <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="${modalId}Label">${res.title}</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <strong>Descripción:</strong> ${res.description} <br/>
                                            <strong>Precio:</strong> $${res.price} <br/>
                                            <strong>Categoría:</strong> ${res.category}
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>`
        );
    });
}

