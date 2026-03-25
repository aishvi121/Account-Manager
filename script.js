function maskAccountNumber(accountNumber) {
    // Show only last 4 digits of account number
    return "XXXX-XXXX-" + accountNumber.slice(-4);
}

function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
            document.getElementById("alert").style.display = "inline"
            setTimeout(() => {
                document.getElementById("alert").style.display = "none"
            }, 2000);
        },
        () => {
            alert("Clipboard copying failed")
        },
    );
}

const deleteAccount = (bankName) => {
    let data = localStorage.getItem("accounts")
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e) => {
        return e.bankName != bankName
    })
    localStorage.setItem("accounts", JSON.stringify(arrUpdated))
    alert(`Successfully deleted ${bankName}'s account`)
    showAccounts()
}

// Logic to fill the table
const showAccounts = () => {
    let tb = document.querySelector("table")
    let data = localStorage.getItem("accounts")
    if (data == null || JSON.parse(data).length == 0) {
        tb.innerHTML = "No Data To Show"
    }
    else {
        tb.innerHTML = `<tr>
            <th>Bank Name</th>
            <th>Account Number</th>
            <th>IFSC Code</th>
            <th>Branch Name</th>
            <th>Delete</th>
        </tr>`
        let arr = JSON.parse(data);
        let str = ""
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];

            str += `<tr>
                <td>${element.bankName} <button class="copy-btn" onclick="copyText('${element.bankName}')">Copy</button></td>
                <td>${maskAccountNumber(element.accountNumber)} <button class="copy-btn" onclick="copyText('${element.accountNumber}')">Copy</button></td>
                <td>${element.ifscCode} <button class="copy-btn" onclick="copyText('${element.ifscCode}')">Copy</button></td>
                <td>${element.branchName} <button class="copy-btn" onclick="copyText('${element.branchName}')">Copy</button></td>
                <td><button class="btnsm" onclick="deleteAccount('${element.bankName}')">Delete</button></td>
            </tr>`
        }
        tb.innerHTML = tb.innerHTML + str
    }
    bankName.value = ""
    accountNumber.value = ""
    ifscCode.value = ""
    branchName.value = ""
}

console.log("Working");
showAccounts()

document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault()
    console.log("Clicked....")
    
    // Get form values
    const bankNameValue = bankName.value.trim();
    const accountNumberValue = accountNumber.value.trim();
    const ifscCodeValue = ifscCode.value.trim();
    const branchNameValue = branchName.value.trim();

    // Validate all fields
    if (!bankNameValue || !accountNumberValue || !ifscCodeValue || !branchNameValue) {
        alert("Please fill in all fields");
        return;
    }

    // Validate IFSC code format (11 characters)
    if (ifscCodeValue.length !== 11) {
        alert("IFSC Code must be 11 characters long");
        return;
    }

    // Validate account number (minimum 9 digits)
    if (!/^\d{9,}$/.test(accountNumberValue)) {
        alert("Account Number must contain at least 9 digits");
        return;
    }

    let accounts = localStorage.getItem("accounts")
    console.log(accounts)
    if (accounts == null) {
        let json = []
        json.push({
            bankName: bankNameValue,
            accountNumber: accountNumberValue,
            ifscCode: ifscCodeValue,
            branchName: branchNameValue
        })
        alert("Account Saved");
        localStorage.setItem("accounts", JSON.stringify(json))
    }
    else {
        let json = JSON.parse(localStorage.getItem("accounts"))
        json.push({
            bankName: bankNameValue,
            accountNumber: accountNumberValue,
            ifscCode: ifscCodeValue,
            branchName: branchNameValue
        })
        alert("Account Saved");
        localStorage.setItem("accounts", JSON.stringify(json))
    }
    showAccounts()
})