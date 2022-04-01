--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1 (Debian 13.1-1.pgdg100+1)
-- Dumped by pg_dump version 14.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer DEFAULT nextval('public.user_id_seq'::regclass) NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    mobile_number character varying NOT NULL,
    email character varying NOT NULL,
    name character varying,
    dob character varying,
    type integer NOT NULL,
    logs jsonb,
    meta jsonb,
    extra jsonb,
    token_info jsonb,
    status integer NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone,
    otp_info jsonb DEFAULT '{}'::jsonb,
    login_info jsonb
);


--
-- Name: users unique_users_id; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_users_id PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--
