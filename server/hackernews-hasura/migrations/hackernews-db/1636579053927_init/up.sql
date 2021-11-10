SET check_function_bodies = false;
CREATE TABLE public.comments (
    id integer NOT NULL,
    parent_id integer,
    comment text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    post_id integer NOT NULL,
    user_issuer text NOT NULL
);
CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;
CREATE TABLE public.comments_votes (
    id integer NOT NULL,
    comment_id integer NOT NULL,
    value integer NOT NULL,
    user_issuer text
);
CREATE SEQUENCE public.comments_votes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.comments_votes_id_seq OWNED BY public.comments_votes.id;
CREATE TABLE public.posts (
    id integer NOT NULL,
    title text NOT NULL,
    url text NOT NULL,
    user_issuer text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now()
);
CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;
CREATE TABLE public.users (
    issuer text NOT NULL,
    "publicAddress" text NOT NULL,
    email text NOT NULL,
    username text NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now(),
    karma integer DEFAULT 1
);
CREATE TABLE public.votes (
    id integer NOT NULL,
    post_id integer NOT NULL,
    user_issuer text NOT NULL,
    value integer NOT NULL
);
CREATE SEQUENCE public.votes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.votes_id_seq OWNED BY public.votes.id;
ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);
ALTER TABLE ONLY public.comments_votes ALTER COLUMN id SET DEFAULT nextval('public.comments_votes_id_seq'::regclass);
ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);
ALTER TABLE ONLY public.votes ALTER COLUMN id SET DEFAULT nextval('public.votes_id_seq'::regclass);
ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.comments_votes
    ADD CONSTRAINT comments_votes_comment_id_user_issuer_key UNIQUE (comment_id, user_issuer);
ALTER TABLE ONLY public.comments_votes
    ADD CONSTRAINT comments_votes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (issuer);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_publicAdress_key" UNIQUE ("publicAddress");
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);
ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_post_id_user_issuer_key UNIQUE (post_id, user_issuer);
ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.comments(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_issuer_fkey FOREIGN KEY (user_issuer) REFERENCES public.users(issuer) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.comments_votes
    ADD CONSTRAINT comments_votes_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON UPDATE RESTRICT ON DELETE CASCADE;
ALTER TABLE ONLY public.comments_votes
    ADD CONSTRAINT comments_votes_user_issuer_fkey FOREIGN KEY (user_issuer) REFERENCES public.users(issuer) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_issuer_fkey FOREIGN KEY (user_issuer) REFERENCES public.users(issuer) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_user_issuer_fkey FOREIGN KEY (user_issuer) REFERENCES public.users(issuer) ON UPDATE RESTRICT ON DELETE RESTRICT;
