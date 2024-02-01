function createRow(phone, index) {
    return `
        <tr>
            <th scope="row">1</th>
            <td>${phone.name}</td>
            <td>${phone.price}</td>
            <td>${phone.description}</td>
            <td>
                <span class="text-danger" style="cursor: pointer;">delete</span>
                <span class="text-info" style="cursor: pointer;">update</span>
            </td>
        </tr>
  `;
}

function validate(name, price) {
    if (!name.value) {
        alert("Phone name must be entered");
        name.focus();
        return false;
    }

    if (!price.value) {
        alert("Price must be entered");
        price.focus();
        return false;
    }

    if (price.value <= 0) {
        alert("Price cannot be negative");
        price.focus();
        return false;
    }

    if (!Number(price.value)) {
        alert("The price must be entered in a number");
        price.focus();
        return false;
    }

    return true
}

export{createRow, validate};