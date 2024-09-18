
import { type Doc, type APISpaceXResponse} from '../types/api'

export const getLaunchById = async ({id}: {id: string})=> {
    const res = await fetch(`https://api.spacexdata.com/v5/launches/${id}`)

    const launch = (await res.json()) as Doc
    
    console.log(launch)

    return launch
}


export const getLatestLaunches = async ()=> {
    const res = await fetch('https://api.spacexdata.com/v5/launches/query',{
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        query: {},
        options: {
            sort:{
                data_unix:'asc',
            },
            limit:12,
        },
    }),
})
const { docs:launches } = await res.json() as APISpaceXResponse
// Después de recibir la respuesta de la API
launches.sort((a, b) => a.date_unix - b.date_unix);
return launches
}
