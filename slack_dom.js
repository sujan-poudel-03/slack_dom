const webElements = document.querySelectorAll('.c-virtual_list__item');
let data = [];
let flag = false;

// Iterate through each element in the NodeList
webElements.forEach(function(element) {
    // Find the button element with the name "Today" within each element
    var todayButton = element.querySelector('.c-message_list__day_divider__label__pill');

    // Check if the button element is found within the current element
    if (todayButton) {
        // Extract and log the button value
        var todayButtonText = todayButton.textContent.trim();
        if(todayButtonText == "Today") {        
            console.log(todayButtonText);
            flag = true;
        }
    } else {
        console.log("Button with name 'Today' not found within the current element.");
    }

    if (flag) {
        console.log(element);

        // Check if profile_name element exists
        var profileNameElement = element.querySelector('.c-message__sender_button');
        var profile_name = profileNameElement ? profileNameElement.textContent.trim() : 'Profile name not found';

        // Check if message element exists
        var messageElement = element.querySelector('.p-rich_text_section');
        var message = messageElement ? messageElement.textContent.trim() : 'Message not found';

        if (profile_name == 'Profile name not found' && message == 'Message not found') {
            console.log("Profile name and message not found");
            // Do something if both profile_name and message are not found
        } else if (profile_name == 'Profile name not found') {
            console.log("");
            // Append into the last index profile_name
            let lastItemIndex = data.length - 1;
            if (lastItemIndex >= 0) {
                data[lastItemIndex] = data[lastItemIndex] + ' ' + message;
            } else {
                console.log("No previous item to append to.");
            }
        } else {
            console.log(profile_name + message);
            data.push(profile_name + " : " + message);
        }
    }
});

// Create a Blob with the data
var blob = new Blob([data.join('\n')], { type: 'text/plain' });

// Create a download link
var link = document.createElement('a');
link.href = window.URL.createObjectURL(blob);
link.download = 'output.txt';

// Append the link to the body and trigger the download
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
