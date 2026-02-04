import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, AuthContextType, LoginUser } from "../types/auth.types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
