"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const apiRoutes = express_1.default.Router();
function bootstrap() {
    // Create dir to store employees list if does not exist yet
    const datadir = path_1.default.join(process.cwd(), 'data');
    if (fs_1.default.existsSync(datadir)) {
        console.log("Data dir found");
    }
    else {
        fs_1.default.mkdirSync(datadir);
        console.log('Data dir created');
    }
    // Create empty employee-list if file does not exist yet
    const filename = path_1.default.join(process.cwd(), 'data/employees-list.json');
    if (fs_1.default.existsSync(filename)) {
        console.log("Employee List file found");
    }
    else {
        fs_1.default.writeFileSync(filename, '[]');
        console.log('Employee List file created');
    }
}
bootstrap();
app.use(express_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
app.use('/api', apiRoutes);
apiRoutes.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to HrNet Api" });
});
apiRoutes.get('/employees-list', (req, res) => {
    const filename = path_1.default.join(process.cwd(), 'data/employees-list.json');
    try {
        const buffer = fs_1.default.readFileSync(filename);
        const employeesData = JSON.parse(String(buffer));
        res.status(200).json({ data: employeesData });
    }
    catch (e) {
        res.status(500).json({ error: "Could not open employees file" });
    }
});
apiRoutes.post('/new-employee', (req, res) => {
    const filename = path_1.default.join(process.cwd(), 'data/employees-list.json');
    try {
        const buffer = fs_1.default.readFileSync(filename);
        const employeesData = JSON.parse(String(buffer));
        fs_1.default.writeFileSync(filename, JSON.stringify([...employeesData, req.body]));
        res.status(201).json({ message: 'Employee Created!' });
    }
    catch (e) {
        res.status(500).json({ message: "The request creation has failed" });
    }
});
app.listen(3001, () => {
    console.log("App listening on port 3001");
});
