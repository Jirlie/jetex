window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const datatablesSimple = document.getElementById('datatablesSimple');
    const datatablesSimpleTwo = document.getElementById('datatablesSimpleTwo');
    const datatablesSimpleThree = document.getElementById('datatablesSimpleThree');
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple);
    }
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimpleTwo);
    }
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimpleThree);
    }
});

