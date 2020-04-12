
    async function success(pos) {
        let latitude, longitude, accuracy, weather, air;
        try{
        latitude = pos.coords.latitude.toFixed(2);
        longitude = pos.coords.longitude.toFixed(2);
        accuracy = pos.coords.accuracy;
        
        document.querySelector('.latitude').innerHTML = `Latitude : ${latitude}`;
        document.querySelector('.longitude').innerHTML = `Longitude: ${longitude}`;
        document.querySelector('.accuracy').innerHTML = `More or less ${accuracy} meters.`;

        // Fetch Data
        const api_url = `/weather/${longitude},${longitude}`;
        const resp = await fetch(api_url);
        const json = await resp.json();

        console.log(json)

        weather = json.weather;
        air = json.air_quality.data.current.pollution;

        document.querySelector('.summary').textContent = weather.weather[0].description;
        document.querySelector('.temp').textContent = weather.main.temp;

        //document.querySelector('.ts').textContent =  air.ts;
        document.querySelector('.aqius').textContent =  air.aqius;
        document.querySelector('.mainus').textContent =  air.mainus;
        document.querySelector('.aqicn').textContent =  air.aqicn;
        document.querySelector('.maincn').textContent =  air.maincn;
        
        } catch (error) {
            console.error(error);
            air = { value: -1 };
            document.getElementById('air').textContent = 'No air quality reading was found.';
        }
         //Post data
         const data = { latitude, longitude, weather, air }
         const options = {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(data)
         };
 
         const db_response = await fetch('/api', options);
         const db_json = await db_response.json();
         console.log(db_json);
       
    }

    if ('geolocation' in navigator) {
        console.log('Geolocation is supported by your browser');
        navigator.geolocation.getCurrentPosition(success);
    } else {
        console.log('no nav')
    }

