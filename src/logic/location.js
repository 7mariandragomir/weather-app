export { location };

class location {
    static getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if(!navigator.geolocation) {
                reject(new Error("Geolocation is not supported on this device."))
            } else {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            }
        })
    }

    static async fetchLocation() {
        try {
            const position = await this.getCurrentLocation();
            return position;
        } catch {
            console.error("Error getting location:", error);
        }
    }
}