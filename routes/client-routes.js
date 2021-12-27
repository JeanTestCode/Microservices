const express = require('express');
const {getClients, addClient, deleteClient,updateClient,getClient,kpiClient,deathDateClient} = require('../controllers/clientController');
const router = express.Router();

/**
 *  @swagger
 *  components:
 *      schemas:
 *          Client:
 *              type: object
 *              required:
 *                  -name
 *                  -lastName
 *                  -age
 *                  -birthDate                   
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The id of the client
 *                  name:
 *                      type: string
 *                      description : The client names
 *                  lastName:
 *                      type: string
 *                      description: The client lastname
 *                  age:
 *                      type: int
 *                      description: The client age
 *                  birthDate:
 *                      type: date
 *                      description: The client birth date                 
 *              example:
 *                  id: MIyWuJsbhArXfvUWBzu7
 *                  name: Joan
 *                  lastName: Añazco
 *                  age: 27
 *                  birthDate: 1994-07-15
 *          ClientDeathDate:
 *              type: object                             
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The id of the client
 *                  name:
 *                      type: string
 *                      description : The client names
 *                  lastName:
 *                      type: string
 *                      description: The client lastname
 *                  age:
 *                      type: int
 *                      description: The client age
 *                  birthDate:
 *                      type: date
 *                      description: The client birth date
 *                  deathDate:
 *                      type: date
 *                      description: The client's probable death date                  
 *              example:
 *                  id: MIyWuJsbhArXfvUWBzu7
 *                  name: Joan
 *                  lastName: Añazco
 *                  age: 27
 *                  birthDate: 1994-07-15
 *                  deathDate: 2038-12-01                                      
 */

/**
 *  @swagger
 *  tags:
 *      name: Clients
 *      description: The clients managing API
 */

/**
 *  @swagger
 *  /clients:
 *      get:
 *          summary: Returns the list of all the clients
 *          tags: [Clients]
 *          responses:
 *              200:
 *                  description: The list of the clients
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Client'
 * 
 */
router.get("/", getClients);

/**
 *  @swagger
 *  /clients/kpideclientes:
 *      get:
 *          summary: Returns age average and age standar desviation
 *          tags: [Clients]
 *          responses:
 *              200:
 *                  description: The age's average and standar desviation
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  average:
 *                                      type: number
 *                                      description: The age's average
 *                                  standarDesviation:
 *                                      type: number
 *                                      description: The age's standar desviation 
 */
 router.get("/kpideclientes", kpiClient);


 /**
 *  @swagger
 *  /clients/listclientes:
 *      get:
 *          summary: Returns clients list with probable date of death
 *          tags: [Clients]
 *          responses:
 *              200:
 *                  description: The age's average and standar desviation
 *                  content:
 *                      application/json:
 *                          schema:                              
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/ClientDeathDate' 
 */
  router.get("/listclientes", deathDateClient);

/**
 *  @swagger
 *  /clients/{id}:
 *      get:
 *          summary: Returns the client by id
 *          tags: [Clients]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: The client id                  
 *          responses:
 *              200:
 *                description: The client description by id
 *                content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Client'
 *              404:
 *                description: The client was not found
 */
router.get("/:id", getClient);


/**
 *  @swagger
 *  /clients:
 *      post:
 *          summary: Create a new client
 *          tags: [Clients]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Client'
 *          responses:
 *              200:
 *                  description: The client was successfully created
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Client'
 *              500:
 *                  description: Internal server error
 */
router.post("/", addClient);
/**
 *  @swagger
 *  /clients/{id}:
 *      put:
 *          summary: Update a client by id
 *          tags: [Clients]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: The client id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Client'                  
 *          responses:
 *              200:
 *                  description: The client was updated
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Client'                 
 *              404:
 *                  description: The client was not found
 *              500:
 *                  description: Internal server error    
 */


router.put("/:id", updateClient);

/**
 *  @swagger
 *  /clients/{id}:
 *      delete:
 *          summary: Remove the client by id
 *          tags: [Clients]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: The client id                       
 *          responses:
 *              200:
 *                  description: The client was deleted                                 
 *              404:
 *                  description: The client was not found                
 */

router.delete("/:id", deleteClient);




module.exports = router;
