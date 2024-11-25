const fileInput = document.getElementById('fileInput')
const pre = document.querySelector('pre')
const tmlTableRow = document.getElementById('tml-table-row')
const outTable = document.getElementById('out-table')

const resetBtn = document.querySelector('#reset')
const dlBtn = document.querySelector('#download')
var emails2 = []

function extractEmail(text) {
    const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9-.]+\.[a-zA-Z]{2,6}/
    let finding = text.match(emailRegex)
    if (finding) {
        return finding
    } else {
        return false
    }
}
function extractEmail2(text) {
    const emailRegex = /^To:.*$/m
    return extractEmail(text.match(emailRegex).toString())
}

function removeDuplicates(array) {
    return [...new Set(array)];
}

function myCleanup(anEmail) {
    parts = anEmail.split(/[@.]/)
    if (parts[0].length > 31) {
        return true
    } else {
        return false
    }
}

function reset() {
    emails2 = []
    tableBody = outTable.querySelector('tbody')
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
    document.querySelector('input').value = ''
}

function addToTable(res, file) {
    let node = tmlTableRow.content.cloneNode(true).querySelector('tr')
    node.querySelector('.res').textContent = res
    node.querySelector('.file').textContent = file
    outTable.querySelector('tbody').appendChild(node)
    
}

function downloadCSV(data, filename = 'export.csv') {
    if (!data.length) {
        return
    }
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

  
function processFiles(files) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            if (contents) {
                let to = extractEmail2(contents)
                emails2.push(to ? to : '-false')
                addToTable(to, file.name)
            }
        };
        reader.readAsText(file); // or readAsDataURL(file) for images
    }
}


fileInput.addEventListener('change', e => {
    const files = e.target.files; // or use fileInput.files
    processFiles(files);
});

resetBtn.addEventListener('click', () => {
    reset()
})

dlBtn.addEventListener('click', () => {
    downloadCSV(emails2)
})