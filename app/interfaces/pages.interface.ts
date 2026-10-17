export interface GameRouteProps {
  params: PageProps<"/games/[id]">["params"];
}

export interface PlayRouteProps {
  params: PageProps<"/games/[id]/play">["params"];
}
