window.addEventListener('load', () =>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.descript');
    let locationTimezone = document.querySelector('.local-time');
    let temperatureDegree = document.querySelector('.degree');
    let temperatureSection = document.querySelector(".celsius-section");
    const temperatureSpan = document.querySelector(".celsius-section span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long =position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'http://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/5d8761b704e0af042be5cbf3702ab263/${lat},${long}`;
            
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                /*console.log(data);*/
                const { temperature, summary, icon } = data.currently;
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone;

                let celsius = (temperature - 32) * (5 / 9);
                setIcons(icon, document.querySelector(".icon1"));

                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                })
            })
        });

        
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});