import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("./routes/_index.tsx"),
  layout("./routes/auth/layout.tsx", [
    route("login", "./routes/auth/login.tsx"),
    route("register", "./routes/auth/register.tsx"),
    route("google", "./routes/auth/google.tsx"),
    route("google/callback", "./routes/auth/callback.tsx")
  ]),

  ...prefix('notes', [
    layout('./routes/notes/layout.tsx', [
      index("./routes/notes/index.tsx"),
      route(":id", "./routes/notes/$id.tsx"),
      route("search", "./routes/notes/search.tsx"),
      route("tags", "./routes/notes/tags.tsx"),
      route("tags/:tag", "./routes/notes/$tag.tsx"),
      route("create", "./routes/notes/create.tsx")
    ])
  ]),

  layout("./routes/notes/layout.tsx", {id: 'archive-layout'}, [
    route("archive", "./routes/notes/archived.tsx"),
    route("archive/:id", "./routes/notes/$id.tsx", { id: "archive-detail" }),
  ]),

  layout("./routes/notes/layout.tsx", {id: 'setting-layout'}, [
    route("setting", "./routes/setting/setting.tsx"),
    route('setting/color', './routes/setting/colorTheme.tsx'),
    route('setting/font', './routes/setting/fontTheme.tsx'),
    route('setting/change-password', './routes/setting/changePassword.tsx')
  ]),
] satisfies RouteConfig;