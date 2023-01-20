import React from "react";
import { ContextInterface } from "../interfaces/ContextInterface";

const Context= React.createContext<ContextInterface | null>(null);

export default Context;