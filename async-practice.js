const delay = (milliseconds) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

async function runPractice() {
    console.log("Starting async practice...");
    await delay(500);
    console.log("Finished waiting.");

    const values = await Promise.all([
        Promise.resolve("first result"),
        delay(200).then(() => "second result"),
        Promise.resolve("third result"),
    ]);

    console.log("Parallel results:", values);
}

runPractice().catch((error) => {
    console.error("Async practice failed:", error);
    process.exitCode = 1;
});
