//Requires
const express = require("express"); // bring in express
const server = express();
let students = require("./db"); // bring in db info
const cors = require("cors"); // bring in CORS

const PORT = "8080";
//USES
server.use(cors());
server.use(express.json()); //reads from form

server.listen(PORT, () => {
  console.log(`listining on port ${PORT}`);
});
//GET will get array of stuedents
server.get("/", (req, res) => {
  res.send(students);
});
//POST will push info into body
server.post("/", (req, res) => {
  const { id, name, company, linkedIn, picture, role } = req.body;
  if (!id || !name || !company || !linkedIn || !picture || !role) {
    return res.status(400).json({
      error: "id, name, company, linkedIn, picture and role are required",
    });
  }
  students.push(req.body);
  res.status(200).json({ status: "success" });
});
//PUT update in body
server.put("/", (req, res) => {
  const { id, name, company, linkedIn, picture, role } = req.body;
  if (!id || !name || !company || !linkedIn || !picture || !role) {
    return res.status(400).json({
      error: "id, name, company, linkedIn, picture and role are required",
    });
  }
  students.put(req.body);
  res.status(200).json({ status: "successful update" });
});
//DELETE/ => body {id}
server.delete("/", (req, res) => {
  const { id } = req.body;
  students = students.filter((student) => student.id !== id);

  res.status(200).json({ status: "sucess" });
});
