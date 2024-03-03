import { Service } from "../../models/Service"
import { AppDataSource } from "../db"

// Create services (5 hardcoded examples)
const serviceSeedDatabase = async () => {
  try {
    await AppDataSource.initialize()

    const service1 = new Service()
    service1.serviceName = "Custom tatoo"
    service1.description =
      "Customer can bring his design and we ink it on his body"
    service1.id = 1
    await service1.save()

    const service2 = new Service()
    service2.serviceName = "Web catalog tatoo"
    service2.description =
      "We have severals desingn on predefined designs in our catalog."
    service2.id = 2
    await service2.save()

    const service3 = new Service()
    service3.serviceName = "Old tattoo restoration"
    service3.description = "We can fix old blur tattos"
    service3.id = 3
    await service3.save()

    const service4 = new Service()
    service4.serviceName = "Piercing and dilator insertion"
    service4.description =
      "We offer professional services for piercing and dilator placement"
    service4.id = 4
    await service4.save()

    const service5 = new Service()
    service5.serviceName = "Sale of piercings and other articles"
    service5.description =
      "In addition to our application services, we offer a selection of piercings and other body art related items. Customers can purchase quality products to complement their unique style."
    service5.id = 5
    await service5.save()

    console.log("Services saved correctly")
  } catch (error) {
    console.log(error)
  } finally {
    if (AppDataSource) {
      await AppDataSource.destroy()
    }
  }
}

serviceSeedDatabase()
