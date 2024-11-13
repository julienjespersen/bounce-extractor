const fileInput = document.getElementById('fileInput');

function extractEmail(text) {
    const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/g;
    return text.match(emailRegex);
}


fileInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  
  reader.onload = function(e) {
    const contents = e.target.result;
    if (contents) {
        const emails = extractEmail(contents);
        
        console.log(emails);
    }
  };
  
  reader.readAsText(file);
});