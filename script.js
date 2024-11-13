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



fileInput.addEventListener('change', function(event) {
    const files = event.target.files; // or use fileInput.files
    processFiles(files);
});
  
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



// fileInput.addEventListener('change', e => {

//     // console.table(e.target.files)
//     [e.target.files].forEach(file => {
//         console.log(file)
        


//         // const file = e.target.files[0];
//         let reader = new FileReader();
        
//         reader.onload = function(ev) {
//             let contents = ev.target.result;
//             if (contents) {
//                 let emails = extractEmail(contents);
//                 if (emails) {
                    
//                     finalList = [...finalList, ...emails];
//                     finalList = removeDuplicates(finalList);
//                     newText = finalList.join('\n')
//                     pre.textContent = newText
//                 }
                
//                 console.table(finalList);
//             }
//         };
        
//         reader.readAsText(file);
//     });

// });