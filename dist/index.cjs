"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_dotenv = __toESM(require("dotenv"), 1);
var import_http = __toESM(require("http"), 1);

// src/app.ts
var import_express2 = __toESM(require("express"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_helmet = __toESM(require("helmet"), 1);

// src/modules/task.routes.ts
var import_express = require("express");

// src/config/prisma.ts
var import_config = require("dotenv/config");
var import_adapter_pg = require("@prisma/adapter-pg");
var import_client = require("@prisma/client");
var connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}
var adapter = new import_adapter_pg.PrismaPg({ connectionString });
var prisma = new import_client.PrismaClient({ adapter });
var prisma_default = prisma;

// src/modules/task.service.ts
var createTask = async (data) => {
  return await prisma_default.task.create({
    data: {
      title: data.title,
      description: data.description ?? "",
      status: data.status || "TODO"
    }
  });
};
var getAllTasks = async () => {
  return await prisma_default.task.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
};
var updateTask = async (id, data) => {
  return await prisma_default.task.update({
    where: { id },
    data
  });
};
var deleteTask = async (id) => {
  return await prisma_default.task.delete({
    where: { id }
  });
};

// src/errors/ApiError.ts
var ApiError = class extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
  }
};

// src/modules/task.controller.ts
var createTask2 = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    if (!title) {
      throw new ApiError("Title is required", 400);
    }
    const newTask = await createTask({ title, description, status });
    return res.status(201).json({
      success: true,
      data: newTask
    });
  } catch (error) {
    next(error);
  }
};
var getAllTasks2 = async (req, res, next) => {
  try {
    const tasks = await getAllTasks();
    return res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};
var updateTaskStatus = async (req, res, next) => {
  try {
    const id = String(req.params.id);
    const { title, description, status } = req.body;
    if (!id) {
      throw new ApiError("Invalid task ID", 400);
    }
    const validstatuses = ["TODO", "IN_PROGRESS", "DONE"];
    if (status && !validstatuses.includes(status)) {
      throw new ApiError("Invalid status value", 400);
    }
    const updateData = {};
    if (title !== void 0) {
      if (!String(title).trim()) {
        throw new ApiError("Title is required", 400);
      }
      updateData.title = String(title).trim();
    }
    if (description !== void 0) {
      updateData.description = String(description).trim();
    }
    if (status !== void 0) {
      updateData.status = status;
    }
    if (Object.keys(updateData).length === 0) {
      throw new ApiError("No update data provided", 400);
    }
    const updatedTask = await updateTask(id, updateData);
    return res.status(200).json({
      success: true,
      data: updatedTask
    });
  } catch (error) {
    next(error);
  }
};
async function deleteTask2(req, res, next) {
  try {
    const id = String(req.params.id);
    if (!id) {
      throw new ApiError("Invalid task ID", 400);
    }
    await deleteTask(id);
    return res.status(200).json({
      status: "success",
      message: "Task deleted successfully"
    });
  } catch (error) {
    next(error);
  }
}

// src/modules/task.routes.ts
var router = (0, import_express.Router)();
router.get("/", getAllTasks2);
router.post("/", createTask2);
router.put("/:id", updateTaskStatus);
router.patch("/:id", updateTaskStatus);
router.delete("/:id", deleteTask2);
var task_routes_default = router;

// src/errors/prisma.error.ts
function handlePrismaError(error) {
  switch (error.code) {
    case "P2002":
      const targetField = Array.isArray(error.meta?.target) ? error.meta.target.join(", ") : String(error.meta?.target || "field");
      return new ApiError(`A record with this ${targetField} already exists.`, 409);
    case "P2025":
      return new ApiError("The requested task was not found.", 404);
    default:
      return new ApiError(`Database error: ${error.message}`, 500);
  }
}

// src/errors/global.error.ts
var import_client2 = require("@prisma/client");
function globalErrorHandler(err, req, res, next) {
  let error = err;
  if (err instanceof import_client2.Prisma.PrismaClientKnownRequestError) {
    error = handlePrismaError(err);
  }
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      status: error.statusCode >= 500 ? "error" : "fail",
      message: error.message
    });
  }
  console.error(" Unexpected Error:", err);
  return res.status(500).json({
    status: "error",
    message: "Something went wrong on our side!"
  });
}

// src/app.ts
var app = (0, import_express2.default)();
app.use((0, import_helmet.default)());
app.use((0, import_cors.default)());
app.use(import_express2.default.json());
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Tasks Manager App API is running"
  });
});
app.use("/api/tasks", task_routes_default);
app.use(globalErrorHandler);
var app_default = app;

// src/index.ts
import_dotenv.default.config();
var server = import_http.default.createServer(app_default);
var PORT = process.env.PORT || 5e3;
server.listen(PORT, () => {
  console.log(`
 Server running on port ${PORT}
`);
});
