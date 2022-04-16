/**
 * @file Declares User data type representing attributes 
 * about a user
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";

/**
 * @typedef User Represents a user
 * @property {mongoose.Schema.Types.ObjectId} _id represents user id
 * @property {string} username Username chosen by the user
 * @property {string} password password chosen by the user
 * @property {string} firstName first name of the user
 * @property {string} lastName last name of the user
 * @property {string} email email of the user
 * @property {string} profilePhoto image representing the profile photo of the user
 * @property {string} headerImage image representing the header image of the user
 * @property {string} biography text message describing the user
 * @property {Date} dateOfBirth Date representing the date of birth of the user
 * @property {AccountType} accountType enum value representing the account type of the user
 * @property {MaritalStatus} maritalStatus enum representing the marital status of the user
 * @property {Location} location enum representing the location of the user
 * @property {number} salary represents the salary of the user
 */
export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    firstName?: string,
    lastName?: string,
    email: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
    salary?: number
};
