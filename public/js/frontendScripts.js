function getUpdate(clickCheckbox) {
    let receiver = document.getElementById("receiver");
    if (clickCheckbox.checked) {
        receiver.disabled = false;
        receiver.style.backgroundColor = "#fff";
    } else {
        receiver.disabled = true;
        receiver.style.backgroundColor = "#c9c9c9";
    }
}

function changeText() {
    let statusresult = document.getElementById("statusResult");
    let statuscode = document.getElementById("statusCode");
    let subResult = document.getElementById("subResult");
    if (statuscode.innerHTML.toString()[0] == 2 || statuscode.innerHTML.toString()[0] == 3) {
        statusresult.innerHTML = "Is Running!!";
        statusresult.style.color = "#fff";
        statusresult.style.backgroundColor = "#55c57a";
        statuscode.style.color = "#fff";
        statuscode.style.backgroundColor = "#55c57a";
        subResult.style.opacity = 1;
    } else if (statuscode.innerHTML.toString()[0] == 4 || statuscode.innerHTML.toString()[0] == 5) {
        statusresult.innerHTML = "Oops!! Something is wrong";
        statusresult.style.color = "#fff";
        statusresult.style.backgroundColor = "#ff7730";
        statuscode.style.color = "#fff";
        statuscode.style.backgroundColor = "#ff7730";
        subResult.style.opacity = 1;
    }
}

function fileUploadName() {
    document.getElementById("fileUpload").onchange = function () {
        document.getElementById("fileLabel").textContent = this.files[0].name;
    }
}