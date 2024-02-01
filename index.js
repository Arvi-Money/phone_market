import { createRow, validate } from "./function.js";

const wrapper = document.querySelector('.wrapper');
const button = document.getElementById("button");
const name = document.getElementById("name");
const price = document.getElementById("price");
const description = document.getElementById("description");
const form = document.getElementById("form");



document.addEventListener("DOMContentLoaded", function () {
    fetch("https://auth-rg69.onrender.com/api/products/all", {
        method: "GET"
    })
    .then((res) => res.json())
    .then(data => {
        if (data.length) {
            data.forEach((phone, index) => {
                let card = createRow(phone, index + 1);
                wrapper.innerHTML += card;
            });
        }

        const deleteButtons = document.querySelectorAll('span.text-danger');
        if (deleteButtons.length) {
            deleteButtons.forEach(del =>{
                del && del.addEventListener("click", function () {
                    let id = this?.parentNode?.getAttribute('data-id').substring(5);
                    if (id) {
                        let isDelete = confirm("Are you sure?");
                        if (isDelete) {
                            fetch(`https://auth-rg69.onrender.com/api/products/${id}`, {
                                method: "DELETE"
                            })

                            .then(res => res.json())
                            .then(data => {
                                if (data.message == "Mahsulot muvaffaqiyatli o'chirildi") {
                                    window.location.reload()
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        }
                    }
                })
            })
        }
    })

         

    .catch(err => {
        console.log(err);
    })
})



button && button.addEventListener("click", function (e) {
    e.preventDefault();

    if(validate(name, price)){
        let phone = {
            name: name.value,
            price: price.value,
            description: description.value,
            status: "active",
            category_id: "2"
        }

        fetch("https://auth-rg69.onrender.com/api/products", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(phone)
        })

        .then(res => res.json())
        .then(data => {
            if(data.id) {
                let row = createRow(phone, wrapper.children.length + 1);
                wrapper.innerHTML += row;
                form.reset();
            }
        })
        .catch(err => {
            console.log(err);
        })
    }
})