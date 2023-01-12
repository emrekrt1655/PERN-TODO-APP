export interface IRegisterData {
    userName: string;
    email: string;
    password: string;
  }


export interface ILoginData {
    email: string;
    password: string;
}

export interface IUserData extends IRegisterData {
    userId: string;
  }

interface IResponseBody {
    status: string;
    message: string;
    data: IUserData;
    activeToken: string;
  }

  interface ILoginBody {
    status: string;
    message: string;
    access_token?: string;
    user?: IUserData;
  }

  export interface IResponseRegister {
    body: IResponseBody;
  }


export interface IResponseLogin {
    body: ILoginBody;
  }

  interface IUsersBody {
    status: string;
    message: string;
    data: IUserData[];
  }

  export interface IUserResponse {
    body: IUsersBody;
  }

export interface ITodo {
  todoId?: string;
  text: string;
  todoUserId?: string;
  todoDone: string;
}

  export interface ITodosBody {
    status: string;
    message: string;
    data: ITodo[]
  }

  export interface ITodoResponse {
    body: ITodosBody;
  }