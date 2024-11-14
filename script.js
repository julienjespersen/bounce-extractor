const fileInput = document.getElementById('fileInput');
const pre = document.querySelector('pre');
const cleanup = document.querySelector('#cleanup');
const dlBtn = document.querySelector('#download');
let finalList = [];

function extractEmail(text) {
    const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9-.]+\.[a-zA-Z]{2,6}/g;
    return text.match(emailRegex);
}

function removeDuplicates(array) {
    return [...new Set(array)];
}
function moderate(email) {
    if (email === email.toUpperCase()) {
        return true
    }

    email.split(/[@.]/).forEach(part => {
        if (part.length > 30) {
            console.log(part)
            return true
        }
    })

    return false
}


  
function processFiles(files) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
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
                // console.table(finalList);
            }
        };
        reader.readAsText(file); // or readAsDataURL(file) for images
    }
}

function downloadCSV(data, filename = 'export.csv') {
    // Convert array to CSV string
    const csvContent = data.join('\n');
  
    // Create a Blob with the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
    // Create a download link
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

fileInput.addEventListener('change', function(event) {
    const files = event.target.files; // or use fileInput.files
    processFiles(files);
});

cleanup.addEventListener('click', e => {
    for (let index = 0; index < finalList.length; index++) {
        if (moderate(finalList[index])) {
            finalList.splice(index, 1)
        }
    }
    newText = finalList.join('\n')
    pre.textContent = newText

})
dlBtn.addEventListener('click', e => {
    console.log(finalList)
    downloadCSV(finalList)
})