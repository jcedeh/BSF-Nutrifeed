import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API",
      version: "1.0.0",
      description: "Authentication API with signup, login, email verification and password reset"
    },
    servers: [
      {
        url: "https://bsf-nutrifeed-1.onrender.com"
      }
    ],
    components: {
      schemas: {
        SignupInput: {
          type: "object",
          required: [
            "first_name",
            "last_name",
            "email",
            "password",
            "confirm_password",
            "role"
          ],
          properties: {
            first_name: {
              type: "string",
              example: "John"
            },
            last_name: {
              type: "string",
              example: "Doe"
            },
            email: {
              type: "string",
              format: "email",
              example: "john@example.com"
            },
            password: {
              type: "string",
              format: "password",
              example: "Password123"
            },
            confirm_password: {
              type: "string",
              format: "password",
              example: "Password123"
            },
            role: {
              type: "string",
              enum: ["farmer", "buyer", "admin"],
              example: "farmer"
            }
          }
        },

        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "john@example.com"
            },
            password: {
              type: "string",
              format: "password",
              example: "Password123"
            }
          }
        },

        ResetPasswordInput: {
          type: "object",
          required: ["token", "password", "confirm_password"],
          properties: {
            token: {
              type: "string",
              example: "resetToken123"
            },
            password: {
              type: "string",
              format: "password",
              example: "NewPassword123"
            },
            confirm_password: {
              type: "string",
              format: "password",
              example: "NewPassword123"
            }
          }
        }
      }
    },
    paths: {
      "/api/auth/signup": {
        post: {
          tags: ["Auth"],
          summary: "User Sign Up",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/SignupInput"
                }
              }
            }
          },
          responses: {
            201: {
              description: "User created successfully"
            },
            400: {
              description: "Validation error"
            }
          }
        }
      },

      "/api/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "User Login",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginInput"
                }
              }
            }
          },
          responses: {
            200: {
              description: "Login successful"
            },
            401: {
              description: "Invalid credentials"
            }
          }
        }
      },

      "/api/auth/verify-email": {
        get: {
          tags: ["Auth"],
          summary: "Verify Email",
          parameters: [
            {
              name: "token",
              in: "query",
              required: true,
              schema: {
                type: "string"
              }
            }
          ],
          responses: {
            200: {
              description: "Email verified successfully"
            },
            400: {
              description: "Invalid or expired token"
            }
          }
        }
      },

      "/api/auth/request-password-reset": {
        post: {
          tags: ["Auth"],
          summary: "Request Password Reset",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email"],
                  properties: {
                    email: {
                      type: "string",
                      format: "email",
                      example: "john@example.com"
                    }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: "Reset link sent"
            },
            404: {
              description: "User not found"
            }
          }
        }
      },

      "/api/auth/reset-password": {
        post: {
          tags: ["Auth"],
          summary: "Reset Password",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ResetPasswordInput"
                }
              }
            }
          },
          responses: {
            200: {
              description: "Password reset successful"
            },
            400: {
              description: "Invalid or expired token"
            }
          }
        }
      }
    }
  },
  apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;