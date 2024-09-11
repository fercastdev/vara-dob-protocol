--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.14
-- Dumped by pg_dump version 9.5.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: actuadors; Type: TABLE; Schema: public; Owner: lbg
--

CREATE TABLE public.actuadors (
    id integer NOT NULL,
    atributo character varying,
    serie character varying,
    tipo character varying,
    codigo character varying,
    clase character varying,
    topic character varying,
    numero character varying,
    sector character varying,
    ubicacion character varying,
    zona character varying,
    nombre character varying,
    estado character varying,
    estado_alerta boolean,
    habilitado boolean,
    energia character varying,
    valor character varying,
    "mostrar?" boolean,
    ultima_activacion timestamp without time zone,
    hub_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.actuadors OWNER TO lbg;

--
-- Name: actuadors_id_seq; Type: SEQUENCE; Schema: public; Owner: lbg
--

CREATE SEQUENCE public.actuadors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.actuadors_id_seq OWNER TO lbg;

--
-- Name: actuadors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lbg
--

ALTER SEQUENCE public.actuadors_id_seq OWNED BY public.actuadors.id;


--
-- Name: administradors; Type: TABLE; Schema: public; Owner: lbg
--

CREATE TABLE public.administradors (
    id integer NOT NULL,
    nombre character varying,
    apellido_paterno character varying,
    apellido_materno character varying,
    rut character varying,
    telefono character varying,
    preferencia character varying,
    mail character varying,
    password_hash character varying,
    auth_token character varying,
    token_created_at timestamp without time zone,
    ultima_conexion timestamp without time zone,
    titulo character varying,
    region character varying,
    comuna character varying,
    ciudad character varying,
    calle character varying,
    numero_de_calle integer,
    numero_de_departamento integer,
    "es_departamento?" boolean,
    latitud numeric(10,6),
    longitud numeric(10,6),
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.administradors OWNER TO lbg;

--
-- Name: administradors_id_seq; Type: SEQUENCE; Schema: public; Owner: lbg
--

CREATE SEQUENCE public.administradors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.administradors_id_seq OWNER TO lbg;

--
-- Name: administradors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lbg
--

ALTER SEQUENCE public.administradors_id_seq OWNED BY public.administradors.id;


--
-- Name: alarmas; Type: TABLE; Schema: public; Owner: lbg
--

CREATE TABLE public.alarmas (
    id integer NOT NULL,
    titulo character varying,
    modelo character varying,
    estado character varying,
    codigo character varying,
    modelo_id integer,
    evento_de_alerta character varying,
    nombre_de_dispositivo character varying,
    valor_de_alerta numeric,
    prioridad_de_alerta character varying,
    "mostrar?" boolean,
    activa boolean,
    hub_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    "envio_alerta?" boolean
);


ALTER TABLE public.alarmas OWNER TO lbg;

--
-- Name: alarmas_id_seq; Type: SEQUENCE; Schema: public; Owner: lbg
--

CREATE SEQUENCE public.alarmas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.alarmas_id_seq OWNER TO lbg;

--
-- Name: alarmas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lbg
--

ALTER SEQUENCE public.alarmas_id_seq OWNED BY public.alarmas.id;


--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: lbg
--

CREATE TABLE public.ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.ar_internal_metadata OWNER TO lbg;

--
-- Name: camaras; Type: TABLE; Schema: public; Owner: lbg
--

CREATE TABLE public.camaras (
    id integer NOT NULL,
    nombre character varying,
    serie character varying,
    estado character varying,
    "soporta_escuchar_audio?" boolean,
    "soporta_envio_de_audio?" boolean,
    ultima_conexion timestamp without time zone,
    user_servidor character varying,
    pass_servidor character varying,
    "dns?" boolean,
    ip_servidor character varying,
    dns_servidor character varying,
    puerto_servidor_http integer,
    puerto_servidor_rtsp integer,
    "principal?" boolean,
    "mostrar?" boolean,
    zona character varying,
    estado_alerta boolean,
    estado_de_grabacion boolean,
    hub_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    "envio_mail?" boolean
);


ALTER TABLE public.camaras OWNER TO lbg;

--
-- Name: camaras_id_seq; Type: SEQUENCE; Schema: public; Owner: lbg
--

CREATE SEQUENCE public.camaras_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.camaras_id_seq OWNER TO lbg;

--
-- Name: camaras_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lbg
--

ALTER SEQUENCE public.camaras_id_seq OWNED BY public.camaras.id;


--
-- Name: configuracions; Type: TABLE; Schema: public; Owner: lbg
--

CREATE TABLE public.configuracions (
    id integer NOT NULL,
    host_aplicacion_alertas character varying,
    email_aplicacion_alertas character varying,
    password_aplicacion_alertas character varying,
    puerto_aplicacion_alertas character varying,
    host_aplicacion_gestion character varying,
    email_aplicacion_gestion character varying,
    password_aplicacion_gestion character varying,
    puerto_aplicacion_gestion character varying,
    nombre_boton_cliente_uno character varying,
    nombre_boton_cliente_dos character varying,
    nombre_boton_cliente_tres character varying,
    nombre_boton_operario_uno character varying,
    nombre_boton_operario_dos character varying,
    nombre_boton_operario_tres character varying,
    telefono_boton_llamar_cliente_a_uno character varying,
    telefono_boton_llamar_cliente_a_dos character varying,
    telefono_boton_llamar_cliente_a_tres character varying,
    telefono_boton_llamar_cliente_a_cuatro character varying,
    telefono_boton_llamar_operario_a_uno character varying,
    telefono_boton_llamar_operario_a_dos character varying,
    telefono_boton_llamar_operario_a_tres character varying,
    telefono_boton_llamar_operario_a_cuatro character varying,
    tiempo_actualizacion_general integer,
    tiempo_actualizacion_largo integer,
    tiempo_actualizacion_corto integer,
    tiempo_espera_boton_sod integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    cobro_plan_basico character varying,
    cobro_plan_normal character varying,
    cobro_plan_premium character varying,
    cobro_plan_automonitoreo_interior character varying,
    cobro_plan_automonitoreo_exterior character varying,
    cobro_plan_sod_exterior character varying,
    cobro_plan_sod_interior character varying,
    email_copia character varying,
    api_key_firebase character varying,
    api_key_qvo character varying,
    api_token_qvo character varying
);


ALTER TABLE public.configuracions OWNER TO lbg;

--
-- Name: configuracions_id_seq; Type: SEQUENCE; Schema: public; Owner: lbg
--

CREATE SEQUENCE public.configuracions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.configuracions_id_seq OWNER TO lbg;

--
-- Name: configuracions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lbg
--

ALTER SEQUENCE public.configuracions_id_seq OWNED BY public.configuracions.id;


--
-- Name: gestions; Type: TABLE; Schema: public; Owner: lbg
--

CREATE TABLE public.gestions (
    id integer NOT NULL,
    titulo character varying,
    motivo character varying,
    dispositivo character varying,
    comentarios text,
    aviso_a_cliente boolean,
    fecha_de_aviso_a_cliente timestamp without time zone,
    aviso_a_revisor boolean,
    aviso_a_carabineros boolean,
    aviso_seguridad_ciudadana boolean,
    fecha_de_aviso_a_revisor timestamp without time zone,
    emergencia_resulta boolean,
    fecha_de_emergencia_resulta timestamp without time zone,
    estado_de_gestion character varying,
    hub_id bigint,
    operario_id bigint,
    revisor_id bigint,
    alarma_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.gestions OWNER TO lbg;

--
-- Name: gestions_id_seq; Type: SEQUENCE; Schema: public; Owner: lbg
--

CREATE SEQUENCE public.gestions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.gestions_id_seq OWNER TO lbg;

--
-- Name: gestions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lbg
--

ALTER SEQUENCE public.gestions_id_seq OWNED BY public.gestions.id;


--
-- Name: grabacions; Type: TABLE; Schema: public; Owner: lbg
--

CREATE TABLE public.grabacions (
    id integer NOT NULL,
    direccion_video character varying,
    formato_video character varying,
    direccion_imagen character varying,
    formato_imagen character varying,
    inicio_grabacion timestamp without time zone,
    termino_grabacion timestamp without time zone,
    resultado_de_grabacion character varying,
    camara_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    tipo character varying
);


ALTER TABLE public.grabacions OWNER TO lbg;

--
-- Name: grabacions_id_seq; Type: SEQUENCE; Schema: public; Owner: lbg
--

CREATE SEQUENCE public.grabacions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.grabacions_id_seq OWNER TO lbg;

--
-- Name: grabacions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lbg
--

ALTER SEQUENCE public.grabacions_id_seq OWNED BY public.grabacions.id;


--
-- Name: hubs; Type: TABLE; Schema: public; Owner: lbg
--

CREATE TABLE public.hubs (
    id integer NOT NULL,
    nombre character varying,
    nombre_things character varying,
    id_things character varying,
    token_things character varying,
    ultima_conexion timestamp without time zone,
    atributo character varying,
    serie character varying,
    tipo character varying,
    clase character varying,
    codigo character varying,
    topic character varying,
    energia character varying,
    botones integer,
    zona character varying,
    valor character varying,
    estado character varying,
    telefono character varying,
    estado_alerta boolean,
    habilitado boolean,
    "vehicular?" boolean,
    patente character varying,
    latitud_centro numeric(10,6),
    longitud_centro numeric(10,6),
    tiempo_de_conexion integer,
    tiempo_de_muestra integer,
    id_camara_principal integer,
    id_sensor_principal integer,
    id_actuador_principal integer,
    recinto_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    ultima_activacion timestamp without time zone
);


ALTER TABLE public.hubs OWNER TO lbg;

--
-- Name: hubs_id_seq; Type: SEQUENCE; Schema: public; Owner: lbg
--

CREATE SEQUENCE public.hubs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hubs_id_seq OWNER TO lbg;

--
-- Name: hubs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lbg
--

ALTER SEQUENCE public.hubs_id_seq OWNED BY public.hubs.id;


--
-- Name: operarios; Type: TABLE; Schema: public; Owner: lbg
--

CREATE TABLE public.operarios (
    id integer NOT NULL,
    nombre character varying,
    apellido_paterno character varying,
    apellido_materno character varying,
    rut character varying,
    codigo character varying,
    telefono character varying,
    preferencia character varying,
    mail character varying,
    password_hash character varying,
    auth_token character varying,
    habilitado boolean,
    token_created_at timestamp without time zone,
    ultima_conexion timestamp without time zone,
    titulo character varying,
    region character varying,
    comuna character varying,
    ciudad character varying,
    calle character varying,
    numero_de_calle integer,
    numero_de_departamento integer,
    "es_departamento?" boolean,
    latitud numeric(10,6),
    longitud numeric(10,6),
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.operarios OWNER TO lbg;

--
-- Name: operarios_id_seq; Type: SEQUENCE; Schema: public; Owner: lbg
--

CREATE SEQUENCE public.operarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.operarios_id_seq OWNER TO lbg;

--
-- Name: operarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lbg
--

ALTER SEQUENCE public.operarios_id_seq OWNED BY public.operarios.id;


--
-- Name: pagos; Type: TABLE; Schema: public; Owner: lbg
--

CREATE TABLE public.pagos (
    id integer NOT NULL,
    plan character varying,
    plataforma_de_pago character varying,
    medio_de_pago character varying,
    estado_de_pago character varying,
    "pago_exitoso?" boolean,
    fecha_de_pago timestamp without time zone,
    usuario_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    zona character varying,
    monto character varying,
    descripcion character varying,
    periodos_de_pago character varying,
    cobro_plan numeric,
    recinto_id integer,
    transaccion_id_qvo character varying
);


ALTER TABLE public.pagos OWNER TO lbg;

--
-- Name: pagos_id_seq; Type: SEQUENCE; Schema: public; Owner: lbg
--

CREATE SEQUENCE public.pagos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pagos_id_seq OWNER TO lbg;

--
-- Name: pagos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lbg
--

ALTER SEQUENCE public.pagos_id_seq OWNED BY public.pagos.id;


--
-- Name: recintos; Type: TABLE; Schema: public; Owner: lbg
--

CREATE TABLE public.recintos (
    id integer NOT NULL,
    nombre character varying,
    plan character varying,
    tipo character varying,
    evento character varying,
    alerta character varying,
    estado_alerta boolean,
    "sod?" boolean,
    sod_ubicacion character varying,
    "automonitoreo?" boolean,
    automonitoreo_ubicacion character varying,
    titulo character varying,
    region character varying,
    comuna character varying,
    ciudad character varying,
    calle character varying,
    numero_de_calle integer,
    numero_de_departamento integer,
    "es_departamento?" boolean,
    latitud numeric(10,6),
    longitud numeric(10,6),
    zona_id bigint,
    usuario_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    contacto character varying,
    telefono_contacto character varying,
    tipo_de_plan character varying,
    "sod_pago_activo?" boolean,
    "automonitoreo_pago_activo?" boolean,
    "automonitoreo_pago_activo_interior?" boolean,
    "automonitoreo_pago_activo_exterior?" boolean,
    "sod_pago_activo_exterior?" boolean,
    "sod_pago_activo_interior?" boolean,
    pago_plan character varying,
    monto_plan integer
);


ALTER TABLE public.recintos OWNER TO lbg;

--
-- Name: recintos_id_seq; Type: SEQUENCE; Schema: public; Owner: lbg
--

CREATE SEQUENCE public.recintos_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recintos_id_seq OWNER TO lbg;

--
-- Name: recintos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lbg
--

ALTER SEQUENCE public.recintos_id_seq OWNED BY public.recintos.id;


--
-- Name: registros; Type: TABLE; Schema: public; Owner: lbg
--

CREATE TABLE public.registros (
    id integer NOT NULL,
    titulo character varying,
    evento character varying,
    valor_string character varying,
    valor numeric,
    energia numeric,
    activa boolean,
    estado character varying,
    "activa?" boolean,
    "alerta_general?" boolean,
    "alerta_movimiento?" boolean,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    hub_id bigint,
    camara_id bigint,
    sensor_id bigint,
    actuador_id bigint
);


ALTER TABLE public.registros OWNER TO lbg;

--
-- Name: registros_id_seq; Type: SEQUENCE; Schema: public; Owner: lbg
--

CREATE SEQUENCE public.registros_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registros_id_seq OWNER TO lbg;

--
-- Name: registros_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lbg
--

ALTER SEQUENCE public.registros_id_seq OWNED BY public.registros.id;


--
-- Name: revisors; Type: TABLE; Schema: public; Owner: lbg
--

CREATE TABLE public.revisors (
    id integer NOT NULL,
    nombre_institucion character varying,
    telefono_institucion character varying,
    mail_institucion character varying,
    nombre character varying,
    apellido_paterno character varying,
    apellido_materno character varying,
    rut character varying,
    telefono character varying,
    preferencia character varying,
    mail character varying,
    password_hash character varying,
    auth_token character varying,
    habilitado boolean,
    token_created_at timestamp without time zone,
    ultima_conexion timestamp without time zone,
    titulo character varying,
    region character varying,
    comuna character varying,
    ciudad character varying,
    calle character varying,
    numero_de_calle integer,
    numero_de_departamento integer,
    "es_departamento?" boolean,
    latitud numeric(10,6),
    longitud numeric(10,6),
    operario_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.revisors OWNER TO lbg;

--
-- Name: revisors_id_seq; Type: SEQUENCE; Schema: public; Owner: lbg
--

CREATE SEQUENCE public.revisors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.revisors_id_seq OWNER TO lbg;

--
-- Name: revisors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lbg
--

ALTER SEQUENCE public.revisors_id_seq OWNED BY public.revisors.id;


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: lbg
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


ALTER TABLE public.schema_migrations OWNER TO lbg;

--
-- Name: sensors; Type: TABLE; Schema: public; Owner: lbg
--

CREATE TABLE public.sensors (
    id integer NOT NULL,
    atributo character varying,
    serie character varying,
    tipo character varying,
    codigo character varying,
    clase character varying,
    topic character varying,
    numero character varying,
    sector character varying,
    ubicacion character varying,
    zona character varying,
    nombre character varying,
    estado character varying,
    estado_alerta boolean,
    habilitado boolean,
    energia character varying,
    valor character varying,
    "mostrar?" boolean,
    ultima_activacion timestamp without time zone,
    hub_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.sensors OWNER TO lbg;

--
-- Name: sensors_id_seq; Type: SEQUENCE; Schema: public; Owner: lbg
--

CREATE SEQUENCE public.sensors_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sensors_id_seq OWNER TO lbg;

--
-- Name: sensors_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lbg
--

ALTER SEQUENCE public.sensors_id_seq OWNED BY public.sensors.id;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: lbg
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying,
    apellido_paterno character varying,
    apellido_materno character varying,
    telefono_de_contacto character varying,
    telefono_de_contacto_adicional character varying,
    rut character varying,
    mail character varying,
    password_hash character varying,
    auth_token character varying,
    token_created_at timestamp without time zone,
    ultima_conexion timestamp without time zone,
    privilegio character varying,
    preferencia character varying,
    estado_monitoreo_remoto boolean,
    id_usuario_monitor_adicional integer,
    tiempo_de_monitoreo_remoto integer,
    id_de_flow character varying,
    pass_de_flow character varying,
    estado_de_pago boolean,
    fecha_ultimo_pago timestamp without time zone,
    titulo character varying,
    region character varying,
    comuna character varying,
    ciudad character varying,
    calle character varying,
    numero_de_calle integer,
    numero_de_departamento integer,
    "es_departamento?" boolean,
    latitud numeric(10,6),
    longitud numeric(10,6),
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    "asociado?" boolean,
    id_asociado integer,
    token_notificacion_firebase character varying
);


ALTER TABLE public.usuarios OWNER TO lbg;

--
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: lbg
--

CREATE SEQUENCE public.usuarios_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_id_seq OWNER TO lbg;

--
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lbg
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- Name: zonas; Type: TABLE; Schema: public; Owner: lbg
--

CREATE TABLE public.zonas (
    id integer NOT NULL,
    nombre character varying,
    region character varying,
    ciudad character varying,
    comuna character varying,
    mail character varying,
    telefono_seguridad_ciudadana character varying,
    telefono_carabineros character varying,
    latitud_centro numeric(10,6),
    longitud_centro numeric(10,6),
    latitud_uno numeric(10,6),
    longitud_uno numeric(10,6),
    latitud_dos numeric(10,6),
    longitud_dos numeric(10,6),
    latitud_tres numeric(10,6),
    longitud_tres numeric(10,6),
    latitud_cuatro numeric(10,6),
    longitud_cuatro numeric(10,6),
    operario_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


ALTER TABLE public.zonas OWNER TO lbg;

--
-- Name: zonas_id_seq; Type: SEQUENCE; Schema: public; Owner: lbg
--

CREATE SEQUENCE public.zonas_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.zonas_id_seq OWNER TO lbg;

--
-- Name: zonas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: lbg
--

ALTER SEQUENCE public.zonas_id_seq OWNED BY public.zonas.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.actuadors ALTER COLUMN id SET DEFAULT nextval('public.actuadors_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.administradors ALTER COLUMN id SET DEFAULT nextval('public.administradors_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.alarmas ALTER COLUMN id SET DEFAULT nextval('public.alarmas_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.camaras ALTER COLUMN id SET DEFAULT nextval('public.camaras_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.configuracions ALTER COLUMN id SET DEFAULT nextval('public.configuracions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.gestions ALTER COLUMN id SET DEFAULT nextval('public.gestions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.grabacions ALTER COLUMN id SET DEFAULT nextval('public.grabacions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.hubs ALTER COLUMN id SET DEFAULT nextval('public.hubs_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.operarios ALTER COLUMN id SET DEFAULT nextval('public.operarios_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.pagos ALTER COLUMN id SET DEFAULT nextval('public.pagos_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.recintos ALTER COLUMN id SET DEFAULT nextval('public.recintos_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.registros ALTER COLUMN id SET DEFAULT nextval('public.registros_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.revisors ALTER COLUMN id SET DEFAULT nextval('public.revisors_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.sensors ALTER COLUMN id SET DEFAULT nextval('public.sensors_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.zonas ALTER COLUMN id SET DEFAULT nextval('public.zonas_id_seq'::regclass);


--
-- Data for Name: actuadors; Type: TABLE DATA; Schema: public; Owner: lbg
--

COPY public.actuadors (id, atributo, serie, tipo, codigo, clase, topic, numero, sector, ubicacion, zona, nombre, estado, estado_alerta, habilitado, energia, valor, "mostrar?", ultima_activacion, hub_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: actuadors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lbg
--

SELECT pg_catalog.setval('public.actuadors_id_seq', 15106, true);


--
-- Data for Name: administradors; Type: TABLE DATA; Schema: public; Owner: lbg
--

COPY public.administradors (id, nombre, apellido_paterno, apellido_materno, rut, telefono, preferencia, mail, password_hash, auth_token, token_created_at, ultima_conexion, titulo, region, comuna, ciudad, calle, numero_de_calle, numero_de_departamento, "es_departamento?", latitud, longitud, created_at, updated_at) FROM stdin;
4	Pedroadmin	Carrizo	\N	\N	\N	\N	\N	$2a$10$afAgRFEHIWaHwlOKhQrDYOLh6cMuy6vFkZzZF3F61PC.tUAMO405e	be4762406b5c49cdc09cd80eddb296f4	2020-05-02 00:38:48.379809	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2019-02-27 14:54:30.328427	2019-02-27 14:54:30.328427
1	admin	\N	\N	\N	\N	\N	\N	$2a$10$I7K6kFq3DFbQw5nqVvSiX.gpXPAVuOg.VYbVy/F0KZavSv56KrGSu	adcdf1e6f02c7811a9ae4036202fabf1	2020-01-02 18:55:04.187825	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2018-12-04 01:09:32.040431	2020-01-31 10:57:04.604814
6	test	\N	\N	\N	\N	\N	\N	$2a$10$J6DT9gK0Bdr/HU7dmm7v7uUVPX0Ub0cdJ6oTHeZ3cMaP6F1Ko/BiC	111a64651c4eb106ddcf201ad98b144d	2020-02-24 13:41:09.604124	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2019-09-03 01:05:53.11095	2020-02-19 11:59:06.818836
\.


--
-- Name: administradors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lbg
--

SELECT pg_catalog.setval('public.administradors_id_seq', 7, true);


--
-- Data for Name: alarmas; Type: TABLE DATA; Schema: public; Owner: lbg
--

COPY public.alarmas (id, titulo, modelo, estado, codigo, modelo_id, evento_de_alerta, nombre_de_dispositivo, valor_de_alerta, prioridad_de_alerta, "mostrar?", activa, hub_id, created_at, updated_at, "envio_alerta?") FROM stdin;
430080	Presencia1-Bodega	Sensor	\N	SPS	8885	ON	S9584938	\N	1	f	t	17	2020-04-29 03:27:00.004924	2020-04-29 03:27:00.004924	\N
430081	Presencia1-Bodega	Sensor	\N	SPS	8885	ON	S9584938	\N	1	f	t	17	2020-04-29 03:27:04.350103	2020-04-29 03:27:04.350103	\N
430082	Presencia1-Bodega	Sensor	\N	SPS	8885	ON	S9584938	\N	1	f	t	17	2020-04-29 03:27:08.950622	2020-04-29 03:27:08.950622	\N
\.


--
-- Name: alarmas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lbg
--

SELECT pg_catalog.setval('public.alarmas_id_seq', 430082, true);


--
-- Data for Name: ar_internal_metadata; Type: TABLE DATA; Schema: public; Owner: lbg
--

COPY public.ar_internal_metadata (key, value, created_at, updated_at) FROM stdin;
environment	development	2018-12-04 01:08:53.534968	2020-03-06 13:13:02.345112
\.


--
-- Data for Name: camaras; Type: TABLE DATA; Schema: public; Owner: lbg
--

COPY public.camaras (id, nombre, serie, estado, "soporta_escuchar_audio?", "soporta_envio_de_audio?", ultima_conexion, user_servidor, pass_servidor, "dns?", ip_servidor, dns_servidor, puerto_servidor_http, puerto_servidor_rtsp, "principal?", "mostrar?", zona, estado_alerta, estado_de_grabacion, hub_id, created_at, updated_at, "envio_mail?") FROM stdin;
8	CAm	12	\N	\N	\N	\N	admin	Pyrotec2019	\N	cloudtest.from-nh.com	\N	18656	8001	t	f	EXT	f	f	17	2019-09-27 02:27:21.081133	2019-09-27 02:27:37.252904	\N
9	Camara1	231123	\N	\N	\N	\N	admin	admin	\N	170.93.143.139	\N	80	80	t	t	INT	\N	\N	19	2020-02-19 12:20:32.488138	2020-02-19 12:22:48.251524	\N
10	Camara2	231312	\N	\N	\N	\N	admin	admin	\N	freja.hiof.no	\N	1935	1935	\N	\N	EXT	\N	\N	19	2020-02-19 12:22:39.880655	2020-02-19 12:22:51.455823	\N
11	Camara3	wa2asd	\N	\N	\N	\N	admin	admin	\N	35.193.140.104	\N	8554	8554	t	t	INT	\N	\N	19	2020-02-24 13:31:03.722713	2020-02-24 13:32:10.881481	\N
\.


--
-- Name: camaras_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lbg
--

SELECT pg_catalog.setval('public.camaras_id_seq', 11, true);


--
-- Data for Name: configuracions; Type: TABLE DATA; Schema: public; Owner: lbg
--

COPY public.configuracions (id, host_aplicacion_alertas, email_aplicacion_alertas, password_aplicacion_alertas, puerto_aplicacion_alertas, host_aplicacion_gestion, email_aplicacion_gestion, password_aplicacion_gestion, puerto_aplicacion_gestion, nombre_boton_cliente_uno, nombre_boton_cliente_dos, nombre_boton_cliente_tres, nombre_boton_operario_uno, nombre_boton_operario_dos, nombre_boton_operario_tres, telefono_boton_llamar_cliente_a_uno, telefono_boton_llamar_cliente_a_dos, telefono_boton_llamar_cliente_a_tres, telefono_boton_llamar_cliente_a_cuatro, telefono_boton_llamar_operario_a_uno, telefono_boton_llamar_operario_a_dos, telefono_boton_llamar_operario_a_tres, telefono_boton_llamar_operario_a_cuatro, tiempo_actualizacion_general, tiempo_actualizacion_largo, tiempo_actualizacion_corto, tiempo_espera_boton_sod, created_at, updated_at, cobro_plan_basico, cobro_plan_normal, cobro_plan_premium, cobro_plan_automonitoreo_interior, cobro_plan_automonitoreo_exterior, cobro_plan_sod_exterior, cobro_plan_sod_interior, email_copia, api_key_firebase, api_key_qvo, api_token_qvo) FROM stdin;
1	smtp.gmail.com	notificaciones.sod@gmail.com	notificaciones1	587	smtp.gmail.com	notificaciones.sod@gmail.com	notificaciones1	587	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	+562 3245 1053	\N	\N	\N	\N	\N	\N	1	2018-12-04 01:10:53.669363	2018-12-04 01:10:53.669363	\N	\N	\N	0	0	0	0	 sodseguridad@gmail.com	\N	\N	\N
\.


--
-- Name: configuracions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lbg
--

SELECT pg_catalog.setval('public.configuracions_id_seq', 1, true);


--
-- Data for Name: gestions; Type: TABLE DATA; Schema: public; Owner: lbg
--

COPY public.gestions (id, titulo, motivo, dispositivo, comentarios, aviso_a_cliente, fecha_de_aviso_a_cliente, aviso_a_revisor, aviso_a_carabineros, aviso_seguridad_ciudadana, fecha_de_aviso_a_revisor, emergencia_resulta, fecha_de_emergencia_resulta, estado_de_gestion, hub_id, operario_id, revisor_id, alarma_id, created_at, updated_at) FROM stdin;
1	\N	\N	\N	Falsa alarma	f	\N	f	\N	\N	\N	t	\N	Cerrado	2	2	0	1	2018-12-07 18:42:20.542709	2018-12-07 18:42:20.542709
29	\N	\N	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	1942	2019-01-02 16:52:59.930856	2019-01-02 16:52:59.930856
2	\N	INTENTO DE ROBO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	59	2018-12-08 06:03:09.269915	2018-12-08 06:03:09.269915
3	\N	INTENTO DE ROBO	\N	f.a	f	\N	f	\N	\N	\N	t	\N	Cerrado	4	2	0	223	2018-12-17 21:51:49.826832	2018-12-17 21:51:49.826832
4	\N	PORTONAZO	\N	\N	f	\N	f	\N	\N	\N	t	\N	Cerrado	2	2	0	853	2018-12-17 22:26:22.058504	2018-12-17 22:26:22.058504
5	\N	PORTONAZO	\N	\N	f	\N	f	\N	\N	\N	t	\N	Cerrado	2	2	0	853	2018-12-17 22:26:59.909876	2018-12-17 22:26:59.909876
6	\N	PORTONAZO	\N	\N	f	\N	f	\N	\N	\N	t	\N	Cerrado	2	2	0	854	2018-12-17 22:51:16.076431	2018-12-17 22:51:16.076431
7	\N	PORTONAZO	\N	hola	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	854	2018-12-18 14:18:58.794062	2018-12-18 14:18:58.794062
10	\N	PORTONAZO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	1376	2018-12-29 18:44:16.477761	2018-12-29 18:44:16.477761
11	\N	PORTONAZO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	1376	2018-12-29 18:45:26.319253	2018-12-29 18:45:26.319253
14	\N	\N	\N	\N	f	\N	f	\N	\N	\N	t	\N	\N	2	2	0	1376	2018-12-29 18:50:11.171164	2018-12-29 18:50:11.171164
13	\N	\N	\N	\N	f	\N	f	\N	\N	\N	t	\N	\N	2	2	0	1376	2018-12-29 18:50:09.286981	2018-12-29 18:50:09.286981
12	\N	\N	\N	\N	f	\N	f	\N	\N	\N	t	\N	\N	2	2	0	1376	2018-12-29 18:50:06.312924	2018-12-29 18:50:06.312924
8	\N	PORTONAZO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	898	2018-12-20 12:42:45.847144	2018-12-20 12:42:45.847144
9	\N	ROBO SIN DAÑOS	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	898	2018-12-20 12:43:20.938336	2018-12-20 12:43:20.938336
15	\N	PORTONAZO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	1401	2018-12-31 13:02:57.544383	2018-12-31 13:02:57.544383
17	\N	INTENTO DE ROBO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Alertado	2	2	0	1401	2018-12-31 13:04:13.965185	2018-12-31 13:04:13.965185
16	\N	ROBO SIN DAÑOS	\N	\N	t	\N	t	\N	\N	\N	t	\N	Pendiente	2	2	0	1401	2018-12-31 13:04:04.094557	2018-12-31 13:04:04.094557
34	\N	ROBO CON DAÑOS A LAS PERSONAS Y PROPIEDAD	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	1945	2019-01-02 17:57:54.881921	2019-01-02 17:57:54.881921
20	\N	ROBO CON DAÑOS A LAS PERSONAS Y PROPIEDAD	\N	\N	t	\N	t	\N	\N	\N	t	\N	Pendiente	2	2	0	1437	2018-12-31 22:53:44.106092	2018-12-31 22:53:44.106092
33	\N	INTENTO DE ROBO	\N	Test4	f	\N	f	\N	\N	\N	t	\N	Pendiente	2	2	0	1943	2019-01-02 17:14:23.177101	2019-01-02 17:14:23.177101
21	\N	\N	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	1437	2018-12-31 22:54:12.982073	2018-12-31 22:54:12.982073
22	\N	PORTONAZO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	1437	2018-12-31 22:56:22.698141	2018-12-31 22:56:22.698141
23	\N	INTENTO DE ROBO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	1437	2018-12-31 22:57:46.038898	2018-12-31 22:57:46.038898
24	\N	ROBO SIN DAÑOS	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	1437	2018-12-31 22:58:20.415513	2018-12-31 22:58:20.415513
25	\N	PORTONAZO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	1910	2019-01-02 14:20:01.282975	2019-01-02 14:20:01.282975
26	\N	PORTONAZO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	1941	2019-01-02 16:32:12.00069	2019-01-02 16:32:12.00069
27	\N	PORTONAZO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	1941	2019-01-02 16:38:39.722103	2019-01-02 16:38:39.722103
28	\N	PORTONAZO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	1942	2019-01-02 16:48:44.159515	2019-01-02 16:48:44.159515
32	\N	ROBO CON DAÑOS A LA PROPIEDAD	\N	Test23	f	\N	f	\N	\N	\N	t	\N	Cerrado	2	2	0	1942	2019-01-02 17:04:48.632235	2019-01-02 17:04:48.632235
47	\N	PORTONAZO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	4	2	0	2017	2019-01-02 23:26:20.774304	2019-01-02 23:26:20.774304
31	\N	ROBO SIN DAÑOS	\N	Test23	f	\N	f	\N	\N	\N	t	\N	Cerrado	2	2	0	1942	2019-01-02 17:04:27.941564	2019-01-02 17:04:27.941564
30	\N	ROBO SIN DAÑOS	\N	Test2	f	\N	f	\N	\N	\N	t	\N	Cerrado	2	2	0	1942	2019-01-02 17:04:05.312423	2019-01-02 17:04:05.312423
35	\N	PORTONAZO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	1956	2019-01-02 19:34:43.591273	2019-01-02 19:34:43.591273
36	\N	INTENTO DE ROBO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	4	2	0	1362	2019-01-02 19:35:02.9758	2019-01-02 19:35:02.9758
37	\N	ROBO SIN DAÑOS	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	1956	2019-01-02 19:54:01.464791	2019-01-02 19:54:01.464791
38	\N	ROBO SIN DAÑOS	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	4	2	0	1961	2019-01-02 19:54:29.290475	2019-01-02 19:54:29.290475
39	\N	ROBO CON DAÑOS A LAS PERSONAS Y PROPIEDAD	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	4	2	0	1962	2019-01-02 19:57:06.174827	2019-01-02 19:57:06.174827
40	\N	PORTONAZO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	4	2	0	1964	2019-01-02 20:18:18.686815	2019-01-02 20:18:18.686815
42	\N	PORTONAZO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	1956	2019-01-02 20:28:52.890547	2019-01-02 20:28:52.890547
43	\N	ROBO SIN DAÑOS	\N	\N	t	\N	t	\N	\N	\N	t	\N	Pendiente	2	2	0	1956	2019-01-02 20:32:52.786294	2019-01-02 20:32:52.786294
41	\N	ROBO SIN DAÑOS	\N	Test2	f	\N	f	\N	\N	\N	t	\N	Cerrado	4	2	0	1965	2019-01-02 20:24:23.360543	2019-01-02 20:24:23.360543
49	\N	INTENTO DE ROBO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	2015	2019-01-02 23:26:59.718196	2019-01-02 23:26:59.718196
48	\N	\N	\N	\N	t	\N	t	\N	\N	\N	t	\N	\N	2	2	0	2015	2019-01-02 23:26:44.591018	2019-01-02 23:26:44.591018
46	\N	PORTONAZO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	1995	2019-01-02 21:45:57.358352	2019-01-02 21:45:57.358352
45	\N	ROBO SIN DAÑOS	\N	Test4	f	\N	f	\N	\N	\N	t	\N	Pendiente	2	2	0	1956	2019-01-02 20:48:31.571526	2019-01-02 20:48:31.571526
44	\N	PORTONAZO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	1956	2019-01-02 20:33:44.889894	2019-01-02 20:33:44.889894
50	\N	\N	\N	TEST1	t	\N	t	\N	\N	\N	t	\N	Cerrado	4	2	0	2018	2019-01-02 23:28:56.546369	2019-01-02 23:28:56.546369
51	\N	\N	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	2021	2019-01-02 23:31:26.875755	2019-01-02 23:31:26.875755
52	\N	PORTONAZO	\N	\N	f	\N	f	\N	\N	\N	t	\N	Cerrado	4	2	0	2023	2019-01-02 23:33:23.787819	2019-01-02 23:33:23.787819
66	\N	INTENTO DE ROBO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	2317	2019-01-15 13:37:39.959382	2019-01-15 13:37:39.959382
53	\N	\N	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	2089	2019-01-03 13:14:50.289723	2019-01-03 13:14:50.289723
56	\N	ROBO SIN DAÑOS	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	2117	2019-01-03 14:34:29.719027	2019-01-03 14:34:29.719027
55	\N	\N	\N	PRUEBA SISTEMA	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	2092	2019-01-03 13:35:10.017816	2019-01-03 13:35:10.017816
54	\N	PORTONAZO	\N	\N	t	\N	f	\N	\N	\N	t	\N	Cerrado	2	2	0	2091	2019-01-03 13:30:54.483461	2019-01-03 13:30:54.483461
58	\N	PORTONAZO	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	2130	2019-01-03 15:28:44.059476	2019-01-03 15:28:44.059476
60	\N	\N	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	2132	2019-01-03 22:39:12.57918	2019-01-03 22:39:12.57918
59	\N	\N	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	4	2	0	2131	2019-01-03 22:39:00.02073	2019-01-03 22:39:00.02073
61	\N	\N	\N	actualizacion	t	\N	t	\N	\N	\N	\N	\N	Cerrado	4	2	0	2134	2019-01-04 14:47:28.56666	2019-01-04 14:47:28.56666
62	\N	\N	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	2167	2019-01-08 00:08:33.064466	2019-01-08 00:08:33.064466
63	\N	\N	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	2190	2019-01-11 15:17:55.697596	2019-01-11 15:17:55.697596
64	\N	\N	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	14	2	0	2193	2019-01-11 15:27:18.468238	2019-01-11 15:27:18.468238
65	\N	\N	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	15	2	0	2195	2019-01-11 15:57:57.328042	2019-01-11 15:57:57.328042
57	\N	\N	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	4	2	0	2118	2019-01-03 14:35:02.941378	2019-01-03 14:35:02.941378
67	\N	\N	\N	test	t	\N	t	\N	\N	\N	\N	\N	Cerrado	2	2	0	2382	2019-01-17 13:01:59.565584	2019-01-17 13:01:59.565584
68	\N	\N	\N	\N	t	\N	t	\N	\N	\N	\N	\N	Cerrado	2	2	0	11774	2019-01-20 02:47:25.622123	2019-01-20 02:47:25.622123
69	\N	\N	\N	prueba de sistema	t	\N	t	\N	\N	\N	\N	\N	Cerrado	2	2	0	11871	2019-01-21 14:02:41.29273	2019-01-21 14:02:41.29273
70	\N	PORTONAZO	\N	\N	t	\N	t	\N	\N	\N	\N	\N	Cerrado	2	2	0	21475	2019-02-05 02:41:21.089464	2019-02-05 02:41:21.089464
71	\N	PORTONAZO	\N	\N	t	\N	t	\N	\N	\N	\N	\N	Cerrado	4	2	0	20193	2019-02-05 02:41:56.448836	2019-02-05 02:41:56.448836
72	\N	PORTONAZO	\N	\N	t	\N	t	\N	\N	\N	\N	\N	Cerrado	2	2	0	21476	2019-02-05 02:52:51.471661	2019-02-05 02:52:51.471661
73	\N	\N	\N	\N	t	\N	t	\N	\N	\N	\N	\N	\N	2	2	0	21505	2019-02-05 19:31:47.789286	2019-02-05 19:31:47.789286
74	\N	\N	\N	\N	t	\N	t	\N	\N	\N	\N	\N	\N	2	2	0	21505	2019-02-05 19:35:33.347219	2019-02-05 19:35:33.347219
75	\N	PORTONAZO	\N	test	t	\N	t	\N	\N	\N	\N	\N	Cerrado	2	2	0	21546	2019-02-06 19:36:22.312807	2019-02-06 19:36:22.312807
78	\N	PORTONAZO	\N	test	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	27278	2019-03-07 18:43:27.425925	2019-03-07 18:43:27.425925
77	\N	\N	\N	test	f	\N	f	\N	\N	\N	t	\N	\N	2	2	0	27265	2019-03-06 20:43:17.613979	2019-03-06 20:43:17.613979
76	\N	ROBO SIN DAÑOS	\N	\N	t	\N	t	\N	\N	\N	t	\N	Cerrado	2	2	0	27263	2019-02-25 23:58:52.968547	2019-02-25 23:58:52.968547
79	\N	ROBO SIN DAÑOS	\N	\N	t	\N	t	\N	\N	\N	\N	\N	Alertado	2	2	0	27284	2019-03-07 19:55:41.029992	2019-03-07 19:55:41.029992
80	\N	ROBO SIN DAÑOS	\N	Error	t	\N	t	\N	\N	\N	\N	\N	Pendiente	2	2	0	27284	2019-03-07 19:56:59.922775	2019-03-07 19:56:59.922775
81	\N	ROBO SIN DAÑOS	\N	Error	f	\N	t	\N	\N	\N	\N	\N	Alertado	2	2	0	27285	2019-03-07 20:50:44.380939	2019-03-07 20:50:44.380939
82	\N	ROBO SIN DAÑOS	\N	test	t	\N	t	\N	\N	\N	t	\N	Cerrado	17	3	0	27304	2019-03-22 10:18:17.115951	2019-03-22 10:18:17.115951
83	\N	ROBO SIN DAÑOS	\N	test	t	\N	t	\N	\N	\N	\N	\N	Pendiente	2	2	0	27320	2019-04-05 21:02:53.319346	2019-04-05 21:02:53.319346
84	\N	\N	\N	\N	t	\N	t	\N	\N	\N	\N	\N	\N	2	2	0	27324	2019-04-05 21:10:07.939171	2019-04-05 21:10:07.939171
85	\N	PORTONAZO	\N	test	t	\N	t	\N	\N	\N	\N	\N	Cerrado	2	2	0	27328	2019-04-09 00:06:47.710971	2019-04-09 00:06:47.710971
86	\N	PORTONAZO	\N	\N	t	\N	t	\N	\N	\N	\N	\N	Cerrado	2	2	0	27332	2019-04-09 00:30:12.150888	2019-04-09 00:30:12.150888
87	\N	\N	\N	\N	f	\N	f	\N	\N	\N	\N	\N	\N	2	2	0	27344	2019-04-09 01:32:46.643945	2019-04-09 01:32:46.643945
88	\N	\N	\N	\N	t	\N	t	\N	\N	\N	\N	\N	\N	2	2	0	27352	2019-04-09 01:39:03.649942	2019-04-09 01:39:03.649942
89	\N	\N	\N	\N	f	\N	f	\N	\N	\N	\N	\N	\N	2	2	0	27353	2019-04-09 01:39:29.156908	2019-04-09 01:39:29.156908
90	\N	ROBO SIN DAÑOS	\N	tesa	t	\N	t	\N	\N	\N	\N	\N	Cerrado	2	2	0	27479	2019-04-15 14:09:56.105918	2019-04-15 14:09:56.105918
91	\N	PORTONAZO	\N	\N	t	\N	t	\N	\N	\N	\N	\N	Cerrado	2	2	0	27481	2019-04-15 14:10:56.902863	2019-04-15 14:10:56.902863
92	\N	ROBO SIN DAÑOS	\N	test	t	\N	t	\N	\N	\N	\N	\N	Cerrado	2	2	0	27483	2019-04-15 14:16:53.566512	2019-04-15 14:16:53.566512
93	\N	PORTONAZO	\N	test	t	\N	t	\N	\N	\N	\N	\N	Cerrado	2	2	0	27484	2019-04-15 14:17:59.053681	2019-04-15 14:17:59.053681
\.


--
-- Name: gestions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lbg
--

SELECT pg_catalog.setval('public.gestions_id_seq', 93, true);


--
-- Data for Name: grabacions; Type: TABLE DATA; Schema: public; Owner: lbg
--

COPY public.grabacions (id, direccion_video, formato_video, direccion_imagen, formato_imagen, inicio_grabacion, termino_grabacion, resultado_de_grabacion, camara_id, created_at, updated_at, tipo) FROM stdin;
1	\N	\N	/home/Labodegadget/LA/Railsapi/API/public/imagenes/6/2/2018-12-26T12:51:36-03:00.jpeg	jpeg	\N	\N	\N	2	2018-12-26 15:51:40.966247	2018-12-26 15:51:40.966247	foto
2	\N	\N	/home/Labodegadget/LA/Railsapi/API/public/imagenes/6/2/2019-01-07T14:10:49-03:00.jpeg	jpeg	\N	\N	\N	2	2019-01-07 17:10:50.48213	2019-01-07 17:10:50.48213	foto
3	\N	\N	/home/Labodegadget/LA/Railsapi/API/public/imagenes/7/3/2019-02-03T13:34:10-03:00.jpeg	jpeg	\N	\N	\N	3	2019-02-03 16:34:12.179171	2019-02-03 16:34:12.179171	foto
4	\N	\N	/home/Labodegadget/LA/Railsapi/API/public/imagenes/6/4/2019-02-05T18:17:06-03:00.jpeg	jpeg	\N	\N	\N	4	2019-02-05 21:17:07.340201	2019-02-05 21:17:07.340201	foto
5	\N	\N	/home/Labodegadget/LA/Railsapi/API/public/imagenes/6/5/2019-02-05T18:17:07-03:00.jpeg	jpeg	\N	\N	\N	5	2019-02-05 21:17:09.039321	2019-02-05 21:17:09.039321	foto
6	\N	\N	/home/Labodegadget/LA/Railsapi/API/public/imagenes/6/4/2019-02-13T14:33:42-03:00.jpeg	jpeg	\N	\N	\N	4	2019-02-13 17:33:43.975406	2019-02-13 17:33:43.975406	foto
7	\N	\N	/home/Labodegadget/LA/Railsapi/API/public/imagenes/6/5/2019-02-13T14:33:49-03:00.jpeg	jpeg	\N	\N	\N	5	2019-02-13 17:33:51.405325	2019-02-13 17:33:51.405325	foto
8	\N	\N	/home/Labodegadget/LA/Railsapi/API/public/imagenes/6/3/2019-02-13T14:33:46-03:00.jpeg	jpeg	\N	\N	\N	3	2019-02-13 17:34:51.567808	2019-02-13 17:34:51.567808	foto
9	\N	\N	/home/Labodegadget/LA/Railsapi/production/media/imagenes/6/3/2019-02-13T20:16:13-03:00.jpeg	jpeg	\N	\N	\N	3	2019-02-13 23:16:21.053246	2019-02-13 23:16:21.053246	foto
10	\N	\N	/home/Labodegadget/LA/Railsapi/production/media/imagenes/6/4/2019-02-21T17:11:36-03:00.jpeg	jpeg	\N	\N	\N	4	2019-02-21 20:11:37.730897	2019-02-21 20:11:37.730897	foto
11	/home/Labodegadget/LA/Railsapi/production/media/imagenes/6/4/2019-02-21T17:11:40-03:00.mp4	mp4	\N	\N	2019-02-21 20:11:41.032048	2019-02-21 20:11:42.995633	\N	4	2019-02-21 20:11:41.038352	2019-02-21 20:11:41.038352	video
12	\N	\N	/home/Labodegadget/LA/Railsapi/API/public/imagenes/16/8/2019-09-28T12:01:44-03:00.jpeg	jpeg	\N	\N	\N	8	2019-09-28 15:01:46.272151	2019-09-28 15:01:46.272151	foto
13	/home/Labodegadget/LA/Railsapi/API/public/imagenes/16/8/2020-01-03T16:57:56-03:00.mp4	mp4	\N	\N	2020-01-03 19:57:56.386353	2020-01-03 19:57:59.875572	\N	8	2020-01-03 19:57:56.426602	2020-01-03 19:57:56.426602	video
14	\N	\N	/home/Labodegadget/LA/Railsapi/API/public/imagenes/16/8/2020-01-03T16:58:07-03:00.jpeg	jpeg	\N	\N	\N	8	2020-01-03 19:58:14.731261	2020-01-03 19:58:14.731261	foto
\.


--
-- Name: grabacions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lbg
--

SELECT pg_catalog.setval('public.grabacions_id_seq', 14, true);


--
-- Data for Name: hubs; Type: TABLE DATA; Schema: public; Owner: lbg
--

COPY public.hubs (id, nombre, nombre_things, id_things, token_things, ultima_conexion, atributo, serie, tipo, clase, codigo, topic, energia, botones, zona, valor, estado, telefono, estado_alerta, habilitado, "vehicular?", patente, latitud_centro, longitud_centro, tiempo_de_conexion, tiempo_de_muestra, id_camara_principal, id_sensor_principal, id_actuador_principal, recinto_id, created_at, updated_at, ultima_activacion) FROM stdin;
19	Prueba 1	18_Prueba 1	495973d0-5311-11ea-a386-21a5747ca8d6	foeKnvpYDj5oJgxYSMvT	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	11	2020-02-19 12:13:49.981992	2020-02-19 12:14:00.359327	\N
17	Central	3_Central	90694e10-4a45-11e9-a8c4-85decba35de5	DIIjCa21QH50C3WFrDjy	2020-05-07 19:00:06.397695	\N	10fa3-5	HUB	SEGR	IDT	\N	\N	\N	CENTRAL	ON	\N	\N	t	t	\N	\N	-22.479394	-68.909581	\N	\N	8	8855	\N	9	2019-03-19 12:50:24.862496	2019-03-19 13:07:33.256072	\N
\.


--
-- Name: hubs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lbg
--

SELECT pg_catalog.setval('public.hubs_id_seq', 19, true);


--
-- Data for Name: operarios; Type: TABLE DATA; Schema: public; Owner: lbg
--

COPY public.operarios (id, nombre, apellido_paterno, apellido_materno, rut, codigo, telefono, preferencia, mail, password_hash, auth_token, habilitado, token_created_at, ultima_conexion, titulo, region, comuna, ciudad, calle, numero_de_calle, numero_de_departamento, "es_departamento?", latitud, longitud, created_at, updated_at) FROM stdin;
3	Operario2	Segundo	\N	\N	002	\N	\N	\N	$2a$10$X6V08Ep2.qkrv79WDd.bsOa5WKMrq4JrWwi.SVQoZinNlCsI/YdUi	96ffd97aba9010965d627c481f6389dd	\N	2020-05-02 00:40:16.349613	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2019-03-19 13:13:15.369063	2020-05-02 00:39:51.914928
2	Operario1	Primero	\N	11-2	001	\N	\N	\N	$2a$10$8kp96Rrxu2uom7FPp5X1yuklWCru.ndh7SvbGSuay4Zgwc3DR3aCq	25d7ed61c97499a7d4dc7a6de6430157	\N	2020-01-02 19:29:11.892774	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2018-12-07 16:40:40.298964	2020-01-02 19:28:45.991784
5	Operario3	Rio	\N	29.222.123-5	991	5688499959	\N	op_231@gmail.com	$2a$10$BcutJQjPpvbP87sa4DpFeeQkEDS95X39Vu9rw1dc5A2Gwe5GQMgzO	397fbce042a1835c1e297463f572930d	\N	2020-03-02 04:12:20.610259	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2020-02-19 12:02:32.632781	2020-02-19 12:11:37.236353
\.


--
-- Name: operarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lbg
--

SELECT pg_catalog.setval('public.operarios_id_seq', 5, true);


--
-- Data for Name: pagos; Type: TABLE DATA; Schema: public; Owner: lbg
--

COPY public.pagos (id, plan, plataforma_de_pago, medio_de_pago, estado_de_pago, "pago_exitoso?", fecha_de_pago, usuario_id, created_at, updated_at, zona, monto, descripcion, periodos_de_pago, cobro_plan, recinto_id, transaccion_id_qvo) FROM stdin;
\.


--
-- Name: pagos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lbg
--

SELECT pg_catalog.setval('public.pagos_id_seq', 1, false);


--
-- Data for Name: recintos; Type: TABLE DATA; Schema: public; Owner: lbg
--

COPY public.recintos (id, nombre, plan, tipo, evento, alerta, estado_alerta, "sod?", sod_ubicacion, "automonitoreo?", automonitoreo_ubicacion, titulo, region, comuna, ciudad, calle, numero_de_calle, numero_de_departamento, "es_departamento?", latitud, longitud, zona_id, usuario_id, created_at, updated_at, contacto, telefono_contacto, tipo_de_plan, "sod_pago_activo?", "automonitoreo_pago_activo?", "automonitoreo_pago_activo_interior?", "automonitoreo_pago_activo_exterior?", "sod_pago_activo_exterior?", "sod_pago_activo_interior?", pago_plan, monto_plan) FROM stdin;
3	Demostracion	Full	Empresa	B. Panico	Alertado	t	t	Total	f		\N	R.M	Providencia	Santiago	Av Providencia	1650	1106	\N	-33.426506	-70.616094	2	6	2018-12-07 16:56:40.152856	2019-04-23 20:05:20.002296	\N	\N	\N	\N	\N	f	f	t	t	Tarjeta de débito	15000
9	Central	Smart	Empresa	B. Armado Admin	Alertado	t	f		f		\N	Antofagasta	Calama	Calama	Traro 	567	\N	\N	-22.479394	-68.909581	8	16	2019-03-19 13:07:18.946387	2020-01-31 18:32:34.825098	\N	\N	\N	\N	\N	f	f	f	f	Contado	\N
11	Operacion Uno	Full	Empresa	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	9	8	2020-02-19 12:07:24.188598	2020-02-19 12:08:41.054739	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N
\.


--
-- Name: recintos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lbg
--

SELECT pg_catalog.setval('public.recintos_id_seq', 11, true);


--
-- Data for Name: registros; Type: TABLE DATA; Schema: public; Owner: lbg
--

COPY public.registros (id, titulo, evento, valor_string, valor, energia, activa, estado, "activa?", "alerta_general?", "alerta_movimiento?", created_at, updated_at, hub_id, camara_id, sensor_id, actuador_id) FROM stdin;
\.


--
-- Name: registros_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lbg
--

SELECT pg_catalog.setval('public.registros_id_seq', 1, false);


--
-- Data for Name: revisors; Type: TABLE DATA; Schema: public; Owner: lbg
--

COPY public.revisors (id, nombre_institucion, telefono_institucion, mail_institucion, nombre, apellido_paterno, apellido_materno, rut, telefono, preferencia, mail, password_hash, auth_token, habilitado, token_created_at, ultima_conexion, titulo, region, comuna, ciudad, calle, numero_de_calle, numero_de_departamento, "es_departamento?", latitud, longitud, operario_id, created_at, updated_at) FROM stdin;
\.


--
-- Name: revisors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lbg
--

SELECT pg_catalog.setval('public.revisors_id_seq', 1, false);


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: lbg
--

COPY public.schema_migrations (version) FROM stdin;
20180505195616
20180908215439
20180912005619
20180912220831
20180913203228
20180913203244
20180914211517
20180914211537
20181022004124
20181022004210
20181022004227
20181022004252
20181024003613
20181024003631
20181024003651
20181024003704
20181024154207
20181024154218
20181024154344
20181024225506
20181024225633
20181024230125
20181024230931
20181025232650
20181025232706
20181026005134
20181026005148
20181026005205
20181026005228
20181027161736
20181027161807
20181031192546
20181126204826
20181126204840
20181126205510
20181126205511
20181217224324
20181217224325
20181217224345
20181217224349
20181217224359
\.


--
-- Data for Name: sensors; Type: TABLE DATA; Schema: public; Owner: lbg
--

COPY public.sensors (id, atributo, serie, tipo, codigo, clase, topic, numero, sector, ubicacion, zona, nombre, estado, estado_alerta, habilitado, energia, valor, "mostrar?", ultima_activacion, hub_id, created_at, updated_at) FROM stdin;
7122	\N	10fa3-1	MNTR	MAC	CTRL	LBG/MNTR/CTRL/MAC/10fa3-1/16/Central/SERVIDOR/HUB/Actualizacion/CENTRAL/	1	SERVIDOR	HUB	CENTRAL	Actualizacion-HUB	EAC	f	t	\N	OFF	t	2020-01-31 18:27:16.148317	17	2019-03-19 13:53:01.765634	2020-01-31 18:27:28.816231
7123	\N	10fa3-2	MNTR	MEB	ALRM	LBG/MNTR/ALRM/MEB/10fa3-2/16/Central/SERVIDOR/HUB/Bateria/CENTRAL/	1	SERVIDOR	HUB	CENTRAL	Bateria-HUB	EAC	f	t	\N	OFF	t	2020-03-29 00:08:24.09486	17	2019-03-19 13:53:01.779021	2020-03-29 00:08:24.358521
7125	\N	10fa3-4	MNTR	MZN	ALRM	LBG/MNTR/ALRM/MZN/10fa3-4/16/Central/SERVIDOR/HUB/Zona/CENTRAL/	1	SERVIDOR	HUB	CENTRAL	Zona-HUB	\N	f	t	\N	OFF	t	2020-01-03 23:39:18.695725	17	2019-03-19 13:53:01.7967	2020-01-04 00:05:35.560705
8889	\N	S9584938	SNSR	SPS	SEGR	LBG/SNSR/SEGR/SPS/S9584938/16/Central/Patio/Bodega/Presencia1/EXT/	1	Patio	Bodega	EXT	Presencia1-Bodega	\N	\N	t	\N	\N	\N	\N	17	2020-05-01 22:04:13.213301	2020-05-01 22:04:13.213301
8890	\N	S11706577	SNSR	BDP	SEGR	LBG/SNSR/SEGR/BDP/S11706577/16/Central/Habitaciones/Suite/B.Panico1/INT/	1	Habitaciones	Suite	INT	B.Panico1-Suite	\N	\N	t	\N	\N	\N	\N	17	2020-05-01 22:04:13.222766	2020-05-01 22:04:13.222766
7124	\N	10fa3-3	MNTR	MTE	ALRM	LBG/MNTR/ALRM/MTE/10fa3-3/16/Central/SERVIDOR/HUB/Energia/CENTRAL/	1	SERVIDOR	HUB	CENTRAL	Energia-HUB	\N	t	t	\N	ON	t	2020-05-07 19:00:06.409511	17	2019-03-19 13:53:01.787804	2020-05-07 19:00:06.409553
\.


--
-- Name: sensors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lbg
--

SELECT pg_catalog.setval('public.sensors_id_seq', 8890, true);


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: lbg
--

COPY public.usuarios (id, nombre, apellido_paterno, apellido_materno, telefono_de_contacto, telefono_de_contacto_adicional, rut, mail, password_hash, auth_token, token_created_at, ultima_conexion, privilegio, preferencia, estado_monitoreo_remoto, id_usuario_monitor_adicional, tiempo_de_monitoreo_remoto, id_de_flow, pass_de_flow, estado_de_pago, fecha_ultimo_pago, titulo, region, comuna, ciudad, calle, numero_de_calle, numero_de_departamento, "es_departamento?", latitud, longitud, created_at, updated_at, "asociado?", id_asociado, token_notificacion_firebase) FROM stdin;
19	Cliente	Test	\N	\N	\N	13	test1@gmail.com	$2a$10$BOVkyVOaOBGP.BVrO14SOeXNx22Ub0/3esGKqB/fCjHKa2QzVohF2	\N	\N	\N	\N	\N	\N	\N	\N	cus_XMcD9tPYRieBXeuOxnMnMw	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2019-04-25 11:25:28.340423	2019-04-25 17:51:28.570589	t	16	\N
17	Natalia	Cuevas	\N	\N	\N	\N	na.cuevas.pd@gmail.com	$2a$10$PNJJONkToP3hE5w7OfNFXe5cvHIWN/AXCXFjFRY/gWv43CYCQBrbW	4fa57d6d75e99809f880c8e04e24bdea	2019-04-15 14:37:09.508247	\N	\N	\N	\N	\N	\N	cus_P7YdRmOc3xJUyHgMsGgA-Q	\N	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2019-03-19 13:04:00.729488	2019-04-29 00:25:05.504133	t	16	evFfRtpoZcE:APA91bG6uOaFjShEuPTWMkBvPg-M5Hu8eqSOWu_nqYt1zFczCFGj_fdIWe_c6Hs4MqBGbT4p_Tvxy-iXbFTZo0z00v-sXTRteMN2jeAKhVyq-0MU0P1ZrYQPj6FrmWokCq2Elyq13tPf
16	Pablo	Arancibia	\N	0990775785	\N	\N	pr.arancibiav@gmail.com	$2a$10$FrPY1AF3UiO7g5q3Vj/ob.JY74ju5bPWJNR6sU.tOekU6T/e07C9C	586874cfba48e346d225a856530b7d9b	2020-01-31 10:58:48.426213	\N	\N	\N	\N	\N	\N	cus_DXcyZvgewPxmiwPYdOyX-A	\N	t	\N	\N	\N	\N	\N	Traro	567	\N	\N	\N	\N	2019-03-19 12:52:28.377317	2019-08-28 18:23:46.448956	\N	\N	f8vdBBRqOho:APA91bGr5PLig6dbrg4Ra5tdfddoTUkO5vbX_G998J_HMcUY0YVPqpO2D7XWEQWSDEjA2KHEUB9DY8QeagTCvZra9KCRTQbRum8BafuSR6tjNGi83UZ6aHYHqfz_639qRUcRGdmzf897
20	test	\N	\N	\N	\N	\N	test@gmail.com	$2a$10$8Nz0guJ/KpgeVdamYpHF.e5zk6IrtZSdgwicD53o40.DCG5Z0y7ei	\N	\N	\N	\N	\N	\N	\N	\N	cus_dhVRo_zKWlC_uwxQH2ersw	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2019-09-03 01:14:48.291415	2019-09-03 01:14:48.291415	\N	\N	\N
13	Jorge	S	\N	+562 3245 1052	\N	 10.101.102-8	lbg.tech.chile@gmail.com	$2a$10$JNVoCUXX463nn/QCvitH2.rvmoVnoByavbKikk2EmeiyOYCVcYZyC	8cad06ca4a36a7fbcbeffa83863b98ff	2019-02-13 18:43:00.844427	\N	\N	\N	\N	\N	\N	cus_5s6rPEbxQiKHjZpKRYhT0g	\N	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2019-01-18 13:34:03.855307	2019-02-07 19:08:40.739516	t	6	eva7XLnmqe0:APA91bHJiv5MSzi6E-6H6yVojcKNUJitU6fwjGQup_Kwjiou3mgoeUrwH0Gj8LZiA_sJlfc6WujBInBjgc9O3cB1DKIdDwS7ZKorSHtjb7aI5Zd7HY2SUu-Cp4RODXpFFJDgYyVDf9gq
9	Diego	i	\N	+562 3245 1052	\N	 10.101.102-4	ncuevas@labodegagadget.cl	$2a$10$Cn3ZNjz3WDwrzVtTrivQVOtDF65ZE953/Rpubg4HcMCqCNVoI1Jgm	3a31c3f7313fc98cb75030d674e7722a	2019-04-15 14:08:38.079013	\N	\N	\N	\N	\N	\N	cus_784GajaBNLJn7VF9ytOCoA	\N	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2019-01-02 18:03:03.066497	2019-02-07 19:08:27.463868	t	6	eTPxOYBo9a8:APA91bH_7EPZ3DPy2iCi9pHX3QPvJGdnq7DqfH4OWRawPWNc3l6aDdQEcXg6Ow-f3ZKAUBMJ4pD1RqGRoXu9QjkXT4XOqpoHopOd55Y0XmU8vTv5I-Wk6vgFhGMtkkR42kgmfDxbtI1v
8	Juan2	Inn	\N	+5623319281	+56993756664	 12.102.102-3	test@inngmail.com	$2a$10$L9fh5FgT1Z4btx9kA9NwO.bZw9o5u5wEer/C/CC5dx92FXxc/vMI2	88c949d0a9a57a68cab10cfef24dff80	2019-04-26 00:54:14.21152	\N	\N	\N	\N	\N	\N	cus_WUzWRtUzvUQXmZ2S7SR6-g	\N	t	\N	\N	\N	\N	\N	Macul 3211	3211	\N	\N	\N	\N	2018-12-07 17:08:00.962992	2020-02-19 12:13:20.941892	t	6	dGPfRRmcoCY:APA91bF3UZPS80oO_RXnmtr8SpSSNLcuHoTdcSVhAKPdTAEWuRuN-xvR3WRN4lG-dHRTu_fVEyVz2He3nXyqG6hr_pHlslbmZyhL9sRUmXMoqE6OS0LfSICJ9HlxC8mS-2ULgdgkSzq-
14	Gertrudis	S	\N	+562 3245 1052	\N	 10.101.102-7	ger@gmail.com	$2a$10$RDgZPQfAMoNc4PKcs/ydxOVlu1ZDAOWnemQ78y67o52pDdca.LwIm	a08fc542ea77b69dfd0bf573fad7bebd	2019-02-13 18:44:03.613866	\N	\N	\N	\N	\N	\N	cus_VTXgwYTUPHnQPsouJ_j_Lg	\N	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2019-01-18 13:36:04.890002	2019-02-07 19:08:51.327387	t	6	eva7XLnmqe0:APA91bHJiv5MSzi6E-6H6yVojcKNUJitU6fwjGQup_Kwjiou3mgoeUrwH0Gj8LZiA_sJlfc6WujBInBjgc9O3cB1DKIdDwS7ZKorSHtjb7aI5Zd7HY2SUu-Cp4RODXpFFJDgYyVDf9gq
6	Pedro	C.	\N	+562 3245 1053	\N	10.101.102-1	pedrocarrizo@sodchile.cl	$2a$10$m9CoNTr2wo51CFXVNgUmwOEVFzfbPNgEwp6rAB.rKcQMUPV65swm2	62a70b8eaf29e142b2871b48068c3b65	2019-06-23 14:25:03.264084	\N	\N	\N	\N	\N	\N	cus_xz5YbusE-GI5vcijn64ctQ	\N	t	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	2018-12-07 16:41:39.885706	2019-02-27 14:59:20.67635	\N	\N	e32ZC9tRcj4:APA91bHmGPHighHxZVChKYtMVr9RQZi31HwfCXfDdXa4UqMotW5PNNShUfuzxLZFkgIK85Fn5BovIBN_R4uvpaRfP9kwae24jExP6qBwP3UtsBpo7tOwApYkCmhit7xXxO_IbNhZpSQC
\.


--
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lbg
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 20, true);


--
-- Data for Name: zonas; Type: TABLE DATA; Schema: public; Owner: lbg
--

COPY public.zonas (id, nombre, region, ciudad, comuna, mail, telefono_seguridad_ciudadana, telefono_carabineros, latitud_centro, longitud_centro, latitud_uno, longitud_uno, latitud_dos, longitud_dos, latitud_tres, longitud_tres, latitud_cuatro, longitud_cuatro, operario_id, created_at, updated_at) FROM stdin;
2	Las Condes	Región Metropolitana de Santiago	R.M	Las Condes	\N	1402	133	-33.421094	-70.501917	\N	\N	\N	\N	\N	\N	\N	\N	2	2018-12-07 16:38:52.169303	2018-12-07 16:57:56.363214
3	Providencia	Región Metropolitana de Santiago	R.M	Providencia	\N	1414	133	-33.432583	-70.609617	\N	\N	\N	\N	\N	\N	\N	\N	2	2018-12-07 16:48:16.717433	2018-12-07 16:57:59.888013
8	Calama	Región de Antofagasta	Calama	Calama	\N	289 2690	133	-22.642276	-68.434610	\N	\N	\N	\N	\N	\N	\N	\N	3	2019-03-19 13:09:14.942388	2020-02-19 12:10:56.586873
9	Macul	Región Metropolitana de Santiago	Santiago	Macul	\N	\N	\N	-33.486387	-70.600330	\N	\N	\N	\N	\N	\N	\N	\N	5	2019-09-03 01:16:08.924357	2020-02-19 12:11:01.196055
\.


--
-- Name: zonas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: lbg
--

SELECT pg_catalog.setval('public.zonas_id_seq', 10, true);


--
-- Name: actuadors_pkey; Type: CONSTRAINT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.actuadors
    ADD CONSTRAINT actuadors_pkey PRIMARY KEY (id);


--
-- Name: administradors_pkey; Type: CONSTRAINT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.administradors
    ADD CONSTRAINT administradors_pkey PRIMARY KEY (id);


--
-- Name: alarmas_pkey; Type: CONSTRAINT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.alarmas
    ADD CONSTRAINT alarmas_pkey PRIMARY KEY (id);


--
-- Name: ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: camaras_pkey; Type: CONSTRAINT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.camaras
    ADD CONSTRAINT camaras_pkey PRIMARY KEY (id);


--
-- Name: configuracions_pkey; Type: CONSTRAINT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.configuracions
    ADD CONSTRAINT configuracions_pkey PRIMARY KEY (id);


--
-- Name: gestions_pkey; Type: CONSTRAINT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.gestions
    ADD CONSTRAINT gestions_pkey PRIMARY KEY (id);


--
-- Name: grabacions_pkey; Type: CONSTRAINT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.grabacions
    ADD CONSTRAINT grabacions_pkey PRIMARY KEY (id);


--
-- Name: hubs_pkey; Type: CONSTRAINT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.hubs
    ADD CONSTRAINT hubs_pkey PRIMARY KEY (id);


--
-- Name: operarios_pkey; Type: CONSTRAINT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.operarios
    ADD CONSTRAINT operarios_pkey PRIMARY KEY (id);


--
-- Name: pagos_pkey; Type: CONSTRAINT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.pagos
    ADD CONSTRAINT pagos_pkey PRIMARY KEY (id);


--
-- Name: recintos_pkey; Type: CONSTRAINT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.recintos
    ADD CONSTRAINT recintos_pkey PRIMARY KEY (id);


--
-- Name: registros_pkey; Type: CONSTRAINT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.registros
    ADD CONSTRAINT registros_pkey PRIMARY KEY (id);


--
-- Name: revisors_pkey; Type: CONSTRAINT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.revisors
    ADD CONSTRAINT revisors_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sensors_pkey; Type: CONSTRAINT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.sensors
    ADD CONSTRAINT sensors_pkey PRIMARY KEY (id);


--
-- Name: usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- Name: zonas_pkey; Type: CONSTRAINT; Schema: public; Owner: lbg
--

ALTER TABLE ONLY public.zonas
    ADD CONSTRAINT zonas_pkey PRIMARY KEY (id);


--
-- Name: index_actuador_hub_id; Type: INDEX; Schema: public; Owner: lbg
--

CREATE INDEX index_actuador_hub_id ON public.actuadors USING btree (hub_id);


--
-- Name: index_alarma_hub_id; Type: INDEX; Schema: public; Owner: lbg
--

CREATE INDEX index_alarma_hub_id ON public.alarmas USING btree (hub_id);


--
-- Name: index_camara_hub_id; Type: INDEX; Schema: public; Owner: lbg
--

CREATE INDEX index_camara_hub_id ON public.camaras USING btree (hub_id);


--
-- Name: index_gestiones_alarma_id; Type: INDEX; Schema: public; Owner: lbg
--

CREATE INDEX index_gestiones_alarma_id ON public.gestions USING btree (alarma_id);


--
-- Name: index_gestiones_hub_id; Type: INDEX; Schema: public; Owner: lbg
--

CREATE INDEX index_gestiones_hub_id ON public.gestions USING btree (hub_id);


--
-- Name: index_gestiones_operario_id; Type: INDEX; Schema: public; Owner: lbg
--

CREATE INDEX index_gestiones_operario_id ON public.gestions USING btree (operario_id);


--
-- Name: index_gestiones_revisor_id; Type: INDEX; Schema: public; Owner: lbg
--

CREATE INDEX index_gestiones_revisor_id ON public.gestions USING btree (revisor_id);


--
-- Name: index_grabacion_camara_id; Type: INDEX; Schema: public; Owner: lbg
--

CREATE INDEX index_grabacion_camara_id ON public.grabacions USING btree (camara_id);


--
-- Name: index_hub_recinto_id; Type: INDEX; Schema: public; Owner: lbg
--

CREATE INDEX index_hub_recinto_id ON public.hubs USING btree (recinto_id);


--
-- Name: index_log_actuador_id; Type: INDEX; Schema: public; Owner: lbg
--

CREATE INDEX index_log_actuador_id ON public.registros USING btree (actuador_id);


--
-- Name: index_log_camara_id; Type: INDEX; Schema: public; Owner: lbg
--

CREATE INDEX index_log_camara_id ON public.registros USING btree (camara_id);


--
-- Name: index_log_hub_id; Type: INDEX; Schema: public; Owner: lbg
--

CREATE INDEX index_log_hub_id ON public.registros USING btree (hub_id);


--
-- Name: index_log_sensor_id; Type: INDEX; Schema: public; Owner: lbg
--

CREATE INDEX index_log_sensor_id ON public.registros USING btree (sensor_id);


--
-- Name: index_operario_revisor_id; Type: INDEX; Schema: public; Owner: lbg
--

CREATE INDEX index_operario_revisor_id ON public.revisors USING btree (operario_id);


--
-- Name: index_pago_usuario_id; Type: INDEX; Schema: public; Owner: lbg
--

CREATE INDEX index_pago_usuario_id ON public.pagos USING btree (usuario_id);


--
-- Name: index_recinto_usuario_id; Type: INDEX; Schema: public; Owner: lbg
--

CREATE INDEX index_recinto_usuario_id ON public.recintos USING btree (usuario_id);


--
-- Name: index_recinto_zona_id; Type: INDEX; Schema: public; Owner: lbg
--

CREATE INDEX index_recinto_zona_id ON public.recintos USING btree (zona_id);


--
-- Name: index_sensor_hub_id; Type: INDEX; Schema: public; Owner: lbg
--

CREATE INDEX index_sensor_hub_id ON public.sensors USING btree (hub_id);


--
-- Name: index_zona_operario_id; Type: INDEX; Schema: public; Owner: lbg
--

CREATE INDEX index_zona_operario_id ON public.zonas USING btree (operario_id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

