document.addEventListener("DOMContentLoaded", () => {
    const checkButton = document.getElementById("checkButton");
    checkButton.addEventListener("click", checkCompatibility);
});

async function checkCompatibility() {
    const gameName = document.getElementById("gameName").value;
    const cpu = document.getElementById("cpu").value;
    const gpu = document.getElementById("gpu").value;
    const ram = document.getElementById("ram").value;
    const os = document.getElementById("os").value;

    const resultDiv = document.getElementById("result");
    resultDiv.textContent = "Checking compatibility...";

    const deviceSpecs = {
        cpu: cpu,
        gpu: gpu,
        ram: ram,
        os: os
    };

    const response = await fetch('/check-compatibility', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ gameName, deviceSpecs })
    });

    const result = await response.json();
    resultDiv.textContent = result.message;
}
