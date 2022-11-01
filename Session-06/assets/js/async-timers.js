const outputZone = document.getElementById("OutputZone")

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    for (let i = 0; i < 5; i++) {
        console.log(`Waiting ${i} seconds...`);
        await sleep(i * 1000);
        outputZone.innerHTML +=`<pre>* ${i}</pre>`
    }
    console.log('Done');
}

demo();
