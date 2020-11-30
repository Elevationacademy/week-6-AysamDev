const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/universe', { useNewUrlParser: true })

//blue print of how document will look like
const Schema = mongoose.Schema

const solarSystemSchema = new Schema
({
    planets: [{type: Schema.Types.ObjectId, ref: 'Planet'}],
    starName: String
})

const planetSchema = new Schema
({
    name: String,
    system: {type: Schema.Types.ObjectId, ref: 'SolarSystem'},
    visitors: [{type: Schema.Types.ObjectId, ref: 'Visitor'}]
})


const visitorSchema = new Schema
({
    name: String,
    homePlanet: {type: Schema.Types.ObjectId, ref: 'Planet'},
    visitedPlanets : [{type: Schema.Types.ObjectId, ref: 'Planet'}]
})



const SolarSystem = mongoose.model("SolarSystem", solarSystemSchema)
const Planet = mongoose.model("Planet", planetSchema)
const Visitor = mongoose.model("Visitor", visitorSchema)

s1 = new SolarSystem(
    {
        planets: [],
        starName: "Phenix"
    }
)
p1 = new Planet(
    {
        name: "Mercury",
        system: s1,
        visitors: []

    }
)
p2 = new Planet(
    {
        name: "Earth",
        system: s1,
        visitors: []

    }
)

v1 = new Visitor(
    {
        name: "Aysam",
        homePlanet: p1,
        visitedPlanets: []
    }
)


// v1.visitedPlanets.push(p2)
// p2.visitors.push(v1)
// s1.planets.push(p1)
// s1.planets.push(p2)

// s1.save()
// p1.save()
// p2.save()
// v1.save()

//1st query
//  Visitor.findOne({}).populate("visitedPlanets").exec(function(err,visitor)
//  {
//      visitor.visitedPlanets.forEach(vp => console.log(vp))
//  })

    //2nd query
	//Find all the visitors on a planet
	//  Planet.findOne({}).skip(1).populate("visitors").exec(function(err, planet) {
	//     planet.visitors.forEach(v => console.log(v.name))
    // }) 

// 3rd query
//populate all
SolarSystem.findOne({}).populate(
    {
        path: "planets",
        populate: 
        {
            path: "visitors"
        }
    }
).exec(function(err,solarSystem)
{
    solarSystem.planets.forEach(p => {
        p.visitors.forEach(v => console.log(v.name))
    })
})