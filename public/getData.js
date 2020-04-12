//get DATA
async function getData(){
    const response = await fetch('/api');
    const data = await response.json();

    for(item of data){
        const root = document.createElement('div');
        const geo = document.createElement('div');
        const date = document.createElement('div');

        geo.textContent = `${item.latitude}, ${item.longitude}`;
        const dateString = new Date(item.timestamp).toLocaleDateString();
        date.textContent = dateString;

        root.append(geo, date,);
        document.body.append(root)
    }
}

getData();