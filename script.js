const fileInput = document.getElementById('fileInput');
const pre = document.querySelector('pre');
let finalList = [];

function extractEmail(text) {
    const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}/g;
    return text.match(emailRegex);
}

function removeDuplicates(array) {
    return [...new Set(array)];
}


fileInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  
  reader.onload = function(e) {
    const contents = e.target.result;
    if (contents) {
        let emails = extractEmail(contents);
        if (emails) {
            
            finalList = [...finalList, ...emails];
            finalList = removeDuplicates(finalList);
            newText = finalList.join('\n')
            pre.textContent = newText
        }
        
        console.table(finalList);
    }
  };
  
  reader.readAsText(file);
});