const ngrokUrl = "https://a272-34-142-156-152.ngrok-free.app"; // Replace with your ngrok URL

fetch(ngrokUrl, {
    method: 'POST',
    body: "Test data", // Send simple text data
})
.then(response => {
    if (response.ok) {
        console.log("POST request sent successfully");
    } else {
        console.error("Error sending POST request:", response.status);
    }
})
.catch(error => {
    console.error("Request error:", error);
});
        console.error("Request error:", error);
    });
}
