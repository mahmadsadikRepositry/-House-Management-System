# House Management System - Node.js, Express, and MongoDB

Welcome to the **House Management System** project! This system demonstrates how to use **Node.js**, **Express**, and **MongoDB** to manage houses, owners, and their relationships using **Mongoose**.

In this project, we will cover the following database relationships:
- **One-to-One** relationship between House and Owner.
- **One-to-Many** relationship between Owner and House.
- **Many-to-Many** relationship between Owners and Houses using a third collection.

This project aims to give you hands-on experience with **REST APIs** and **MongoDB** relationships.

---

## Project Overview

### 1. **One-to-One Relationship**
In this relationship, each house has exactly one owner, and each owner owns exactly one house. We represent this by embedding the `Owner` schema inside the `House` schema.

### 2. **One-to-Many Relationship**
In this relationship, one owner can have many houses, but each house belongs to one owner. We achieve this by using a reference (`ObjectId`) to the `Owner` schema in the `House` schema.

### 3. **Many-to-Many Relationship**
In a many-to-many relationship, multiple owners can own multiple houses. To handle this, we create a third collection, `HouseOwner`, that stores the relationships between owners and houses.

---

## Getting Started

Follow the steps below to set up the **House Management System** on your local machine.

### Prerequisites

Make sure you have the following installed:
- **Node.js** and **npm** (Node Package Manager)
- **MongoDB** (Either locally or using a cloud service like MongoDB Atlas)

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/mahmadsadikRepositry/-House-Management-System.git
cd house-management-system
```

### 2. Install Dependencies

Run the following command to install all the required dependencies:

```bash
npm install
```
### **3️⃣ Configure Environment Variables**
Create a `.env` file in the project root and add the following:
```plaintext
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/HMSCluster0?retryWrites=true&w=majority
PORT=3000
```
**Replace `<username>` and `<password>` with your actual MongoDB credentials.**

### 4. Run the Application

Run the following command to start the Express server:

```bash
npm run dev
```

The application should now be running on `http://localhost:5000`.

---

## API Endpoints

### 1. **Owner Routes**

- **POST** `/api/owners` - Create a new owner
- **GET** `/api/owners` - Get all owners

### 2. **House Routes**

- **POST** `/api/houses` - Create a new house
- **GET** `/api/houses` - Get all houses, including owner information (populated)

### 3. **HouseOwner Routes (Many-to-Many Relationship)**

- **POST** `/api/houseOwners` - Create a relationship between a house and an owner
- **GET** `/api/houseOwners/owner/:ownerId` - Get all houses owned by a specific owner
- **GET** `/api/houseOwners/house/:houseId` - Get all owners of a specific house

---

## Explanation of MongoDB Relationships

### 1. **One-to-One Relationship (House and Owner)**

In the **One-to-One** relationship, each `House` is associated with a single `Owner`, and each `Owner` owns exactly one `House`. This is achieved by embedding the `Owner` schema inside the `House` schema.

```js
const houseSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zip: String,
    owner: { type: String, ref: "Owner" }
});
```

### 2. **One-to-Many Relationship (Owner and Houses)**

In the **One-to-Many** relationship, an `Owner` can own multiple `Houses`, but each `House` belongs to only one `Owner`. We use the `ObjectId` reference in the `House` schema to establish this relationship.

```js
const houseSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    zip: String,
    owner: { type: String, ref: 'Owner' }
});
```

### 3. **Many-to-Many Relationship (House and Owner through HouseOwner)**

In the **Many-to-Many** relationship, one `Owner` can own many `Houses`, and a `House` can have multiple `Owners`. We use a third collection (`HouseOwner`) to store these relationships, where each document contains references to both the `Owner` and `House` collections.

```js
const houseOwnerschema = new mongoose.Schema({
    owner: { type: String, ref: "Owner" },
    house: { type: String, ref: "House" }
});
```

### Populating Data

To fetch related data when querying the `House` model, we use **Mongoose's populate method**. This helps us retrieve information about the related `Owner` when querying for houses.

```js
House.find().populate("owner").exec((err, houses) => {
    if (err) throw err;
    console.log(houses);
});
```

### Populating Data with $lookup (RECOMMENDED)

To fetch related data when querying the `House` model, we use MongoDB's **aggregation** framework with `$lookup`. This method allows us to efficiently join the Owner collection when querying for houses.

Docs: https://www.mongodb.com/docs/manual/aggregation/

```JS
const houses = await House.aggregate([
            {
                $lookup: {
                    from: "houseowners",  // Collection storing owner-house relationships
                    localField: "house_id",  // Field in House collection
                    foreignField: "house",  // Matching field in HouseOwner collection
                    as: "houseOwners"  // Output field containing matched relationships
                }
            },
            // Stage 2: Filter out houses with no owners
            {
                $match: {
                    "houseOwners.0": { $exists: true }  // Ensures only houses with at least one owner are included
                }
            },

            {
                $project:{
                    "houseOwners.house": 0,
                    "houseOwners._id": 0
                }
            }
          ])
.exec((err, houses) => {
    if (err) throw err;
    console.log(houses);
});
```

### Why Use $lookup Instead of .populate()?

✅ Better Performance: `$lookup` executes at the database level, making it faster for large datasets.

✅ Advanced Filtering & Sorting: You can filter owners within the aggregation pipeline.

✅ Supports UUIDs: Unlike `.populate()`, $lookup does not enforce ObjectId casting, making it ideal for non-ObjectId references.

✅ Multi-Level Joins: Easily join multiple collections in a single query.

Use `$lookup` when dealing with large datasets, complex queries, or non-ObjectId references.

---

## How to Use the API

### 1. **Create an Owner**

To create a new owner, send a `POST` request to `/api/owners` with the following body:

```json
{
    "name": "Alex Merced"
}
```

### 2. **Create a House**

To create a new house, send a `POST` request to `/api/houses` with the following body:

```json
{
    "street": "100 Maple Street",
    "city": "Fort Townville",
    "state": "New West Virgota",
    "zip": "77777",
    "ownerId": [{"uuid1" "uuid2"}]
}
```

### 3. **Create a House-Owner Relationship (Many-to-Many)**

To create a relationship between an owner and a house, send a `POST` request to `/api/houseOwners` with the following body:

```json
{
    "ownerId": "uuid",
    "houseId": "uuid"
}
```

### 4. **Get All Houses with Owners**

To retrieve all houses with their associated owners, send a `GET` request to `/api/houses`.

### 5. **Get All Houses for a Specific Owner**

To get all houses owned by a specific owner, send a `GET` request to `/api/houseOwners/owner/:ownerId`.

### 6. **Get All Owners for a Specific House**

To get all owners of a specific house, send a `GET` request to `/api/houseOwners/house/:houseId`.

---

## Conclusion

In this project, you learned how to build a **House Management System** using **Node.js**, **Express**, and **MongoDB**. You also explored how to implement **One-to-One**, **One-to-Many**, and **Many-to-Many** relationships using **Mongoose**.

Feel free to expand this project by adding more features like updating and deleting houses or owners, or integrating authentication for a more complex system!

---

Let me know if you have any further questions or need additional clarifications!