export default async function sendEvent(eventData) {
    try {
      const headers = new Headers();
headers.append('Content-Type', 'application/json');

      const data = await (
        await fetch(`/api/send_event`, {
          method: "POST",
          headers,
body:JSON.stringify(eventData)
        })
      ).json();
      return data;
      
    } catch (e) {
      console.log(e);
    }
  }