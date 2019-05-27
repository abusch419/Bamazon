


    // search for the product
    $(document).on("click", ".edit-button", editItem)
    $(document).on("click", ".save-button", UpdateItem)




    function editItem(event) {
        event.preventDefault()
        var id = $(this).attr("data-id")
        getItemToUpdate(id);
    }


    function getItemToUpdate(id) {

        console.log(id)
        $.get("/api/products/" + id, function (data) {
            const productToEdit = data
            createProductEditorCard(productToEdit)
        })

    }

    // create card from product

    function createProductEditorCard(item) {
        console.log(item)
        $(".row").empty()

        const productCard =
            `    <div class="col-lg-4">
                <div class="card">
                    
                    <input type="text" class="form-control name" data-stock="" placeholder="${item.name}">
                    
                    <div class="card-body">
                        <div class="form-group">
                            <form>
                                <input type="number" class="form-control price" data-stock="" placeholder="${item.price}">
                                <input type="number" class="form-control qty" data-stock="" placeholder="${item.stock}">
                                <input type="text" class="form-control department" data-department="" placeholder="${item.department}">
                                <button type="button" class="btn btn-danger btn-defult save-button" data-id="${item.id}">Save</button>
                                <div class="col-sm-4">                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>`
        $(".row").append(productCard)


    }



    function UpdateItem(item) {


        var newProduct = {
            id: item.id,
            name: $(".name").val(),
            price: $(".price").val(),
            stock: $(".price").val(),
            department: $(".department").val(),

        }
        console.log(newProduct)
        $.ajax({
            method: "PUT",
            url: "/api/products/",
            data: newProduct
        }).then(showModal("Item Updated!"))
    }

    


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
