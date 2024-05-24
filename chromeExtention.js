
let inputElement = document.getElementById("input_url");
let buttonElement = document.getElementById("save_btn");
let buttonElementdelete = document.getElementById("delete_btn");
let buttonElementSaveTab = document.getElementById("save_tab");
let addressArray = [];
let addressArray1 = [];
let listAddress = document.getElementById("list_address")

//this addEventListener do the same thing on button that onclick did, this is my code
    buttonElement.addEventListener("click", function(){
        addressArray.push(inputElement.value); 
        inputElement.value = " ";
        localStorage.setItem("addressArray", JSON.stringify(addressArray))
        rennderList(addressArray)
        }
        );
    
    function addressRenderedWhenRefresh() {
        addressArray1 = JSON.parse(localStorage.getItem("addressArray"));
        if (addressArray1 && addressArray1.length > 0) {
                rennderList(addressArray1);
        } else {
            // Handle case when the addressArray1 is null or empty
            console.log("No addresses found in local storage.");
        }
    }

    function rennderList(arr){
        listAddress.innerHTML = ""
            for(let j=0; j<arr.length; j++){
                listAddress.innerHTML += `<a href='${arr[j]}' target = '_blank'>
                ${arr[j]}</a>
                <br>`;
            }
    }

    buttonElementdelete.addEventListener("click", function(){
        localStorage.clear()
        addressArray = []
        rennderList(addressArray)
    }
    );

    buttonElementSaveTab.addEventListener("click", function(){
        // Query the currently active tab
        chrome.tabs.query({active: true, currentWindow:true}, function(tabs){
            // Load existing saved URLs from local storage
            let savedUrls = JSON.parse(localStorage.getItem("addressArray")) || [];
            // Get the URL of the active tab
            let tabUrl = tabs[0].url;
            // Append the URL to the existing array
            savedUrls.push(tabUrl);
            // Save the updated array back to local storage
            localStorage.setItem("addressArray", JSON.stringify(savedUrls));
            // Render the list with the updated array
            rennderList(savedUrls);
        });
    });

    addressRenderedWhenRefresh()
