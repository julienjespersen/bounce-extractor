const fileInput = document.getElementById('fileInput')
const pre = document.querySelector('pre')
const tmlTableRow = document.getElementById('tml-table-row')
const outTable = document.getElementById('out-table')

// const cleanup = document.querySelector('#cleanup');
const dlBtn = document.querySelector('#download')
var emails = []
var emails2 = []

function extractEmail(text) {
    const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9-.]+\.[a-zA-Z]{2,6}/
    let finding = text.match(emailRegex)
    if (finding) {
        return finding
    } else {
        return false
    }
    // return text.match(emailRegex)
}
function extractEmail2(text) {
    const emailRegex = /^To:.*$/m
    return extractEmail(text.match(emailRegex).toString()) //.toString().substring(3)
}

function removeDuplicates(array) {
    return [...new Set(array)];
}



function myCleanup(anEmail) {
    parts = anEmail.split(/[@.]/)
    // console.log(parts)
    if (parts[0].length > 31) {
        return true
    } else {
        return false
    }
}

function addToTable(res, file) {
    let node = tmlTableRow.content.cloneNode(true).querySelector('tr')
    node.querySelector('.res').textContent = res
    node.querySelector('.file').textContent = file
    outTable.querySelector('tbody').appendChild(node)
    
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

  
function processFiles(files) {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            if (contents) {
                // let emails = extractEmail2(contents)
                let to = extractEmail2(contents)
                // console.log( typeof(to))
                emails2.push(to)
                addToTable(to, file.name)
                // if (emails) {
                    // finalList = [...finalList, ...emails];
                    // emails2 = removeDuplicates(emails);
                    // pre.textContent = emails2.join('\n')
                    // pre.textContent = newText
                // }
                // pre.textContent = emails2.join('\n')

                // console.table(finalList);
            }
        };
        reader.readAsText(file); // or readAsDataURL(file) for images
    }
}

fileInput.addEventListener('change', function(event) {
    const files = event.target.files; // or use fileInput.files
    processFiles(files);
});

// cleanup.addEventListener('click', e => {
//     // console.clear()
//     // emails2 = []
//     console.table(emails2)

//     // emails2 = removeDuplicates(emails)
//     for (let i = emails2.length - 1; i >= 0; i--) {
//     // for (let i = 0; i < emails2.length; i++) {
//     let yn = myCleanup(emails2[i])
//         console.log(i, emails2[i], yn)
//         if (yn) {
            
//             emails2.splice(i, 1)
//         }
        
//     }
//     console.table(emails2)


    
//     pre.textContent = emails2.join('\n')
//     // console.table(emails2)
// })

dlBtn.addEventListener('click', e => {
    // console.log(finalList)
    downloadCSV(emails2)
})