


$(document).ready(function () {

    $(document).on("click", ".delete-button", DeleteItem)

    $(".add-items").hide()
    
    var products = []

    renderLogIn()

//    basic check password logic - never do this on the front end in real life!!

    $(".login-submit").on("click", function(e) {
        e.preventDefault() 
        if ($("#password").val() === "RockOn!") {
            $(".add-items").show()
            getProducts();
        }
        else if($("#password").val() !== "RockOn!") {
            alert("Incorrect Password. Please Enter RockOn!")
        }
    })

    // login render logic
    
    function renderLogIn(){
        $(".card-row").empty()
        const logInForm = `<form class="row login">
        <div class="form-group col-12">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
        </div>
        <div class="form-group col-12">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" placeholder="Password: RockOn!">
        </div>
        <button type="submit" class="btn btn-primary col-12 login-submit">Submit</button>
          </form>`

          $(".card-row").append(logInForm)
    }

    // show modal when item is deleted

    function showModal(message) {
        var modal = ` <div id="purchaseModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">
                       ${message}
                    </h3>
                </div>
                <div class="modal-body img-responsive">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" id="confirm">Confirm</button>
                </div>
            </div>

        </div>
    </div>`
        $(modal).modal("toggle");
    }

    // search for the products in the databse
    function getProducts() {
        $.get("/api/products", function (data) {
            products = data;
            $(".card-row").empty()
            createCard(products)
        })
    }

    // create card from each product
    function createCard(items) {
        for (let i = 0; i < items.length; i++) {
            const productCard =
                `    <div class="col-lg-4 card">
                <div>
                    <div class="card-header" id="product-name-${i}">
                        ${items[i].name}
                    </div>
                    <div class="card-body">
                    <img id="product-image" src="${items[i].imgUrl}" alt="Product Image">
                        <div class="form-group">
                            <form class="form-row">
                                <label for="qty" class="col-sm-6 col-form-label price-label" id="price-${i}"> $${items[i].price}.99</label>
                                    <button type="button" class="btn btn-danger btn-defult col-sm-6 delete-button" data-id="${items[i].id}">Delete</button>
                                    <button type="button" class="btn btn-primary btn-defult col-sm-12 edit-button" data-id="${items[i].id}">Edit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>`
            $(".card-row").append(productCard)
        }

    }
    // ===========Delete Items========

    function DeleteItem(event) {
        event.preventDefault();
        var id = $(this).attr("data-id")
        // console.log(product)
        $.ajax({
            method: "DELETE",
            url: "/api/products/" + id
        })
        .then(getProducts, showModal("Item Deleted!"))
    }

    // ===========Update Items========
    
    $(document).on("click", ".edit-button", editItem)
    $(document).on("click", ".save-button", UpdateItem)

    function editItem(event) {
        event.preventDefault()
        var id = $(this).attr("data-id")
        getItemToUpdate(id);
    }


    function getItemToUpdate(id) {
        $.get("/api/products/" + id, function (data) {
            const productToEdit = data
            createProductEditorCard(productToEdit)
        })

    }

    // create product editor form

    function createProductEditorCard(item) {
        $(".card-row").empty()
        const productCard =
            `<div class="edit-card">
                    <input type="text" class="form-control col-12 name" data-stock="" placeholder="${item.name}" data-id="data-name">
                    <div class="card-body">
                        <div class="form-group row">
                            <form class="row"> 
                                <input type="number" class="form-control price col-12" placeholder="${item.price}" data-id="data-price">
                                <input type="number" class="form-control col-12 qty-edit" placeholder="${item.stock}" data-id="data-qty">
                                <input type="text" class="form-control col-12 department" placeholder="${item.department}" data-id="data-department">
                                <input type="text" class="form-control col-12 imgUrl" placeholder="${item.imgUrl}" data-id="data-image">
                            </form>
                        </div>
                    </div>
                </div>`
        $(".card-row").append(productCard)
    }

    function UpdateItem() {
        var id = $(this).attr("data-id")
        var newProduct = {
            id: id,
            name: $(".name").val(),
            price: $(".price").val(),
            stock: $(".price").val(),
            department: $(".department").val(),
            imgUrl: $(".imgUrl").val(),

        }
        $.ajax({
            method: "PUT",
            url: "/api/products/" + id,
            data: newProduct
        }).then(getProducts)
    }
})



