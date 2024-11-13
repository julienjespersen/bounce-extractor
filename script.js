const fileInput = document.getElementById('fileInput');
const pre = document.querySelector('pre');
const dlBtn = document.querySelector('button');
let finalList = [];

function extractEmail(text) {
    const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}/g;
    return text.match(emailRegex);
}

function removeDuplicates(array) {
    return [...new Set(array)];
}



  
function processFiles(files) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            console.log('File contents:', contents);


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

dlBtn.addEventListener('click', e => {
    console.log(finalList)

    downloadCSV(finalList)
})