CREATE TABLE hold_onto (
    id serial not null,
    product_name varchar(64) not null,
    serial_code varchar(64),
    customer_staff integer not null,
    get_date date,
    get_staff integer not null,
    storage_period date,
    storage_place varchar(64),
    payout_date date,
    payout_staff integer,
    project_title varchar(64),
    status varchar(64),
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    PRIMARY KEY (id),
    FOREIGN KEY(customer_staff) REFERENCES "Staff"(staff_id),
    FOREIGN KEY(get_staff) REFERENCES "Staff"(staff_id),
    FOREIGN KEY(payout_staff) REFERENCES "Staff"(staff_id)
);

CREATE TABLE construction_materials (
    id serial not null,
    order_date date,
    order_distination varchar(64),
    product_name varchar(64) not null,
    product_type varchar(64),
    credit varchar(8),
    quantity integer,
    unit_price integer,
    price integer,
    wbs integer,
    construction_for_short varchar(64),
    delivery_date date,
    payout_date date,
    staff_id integer not null,
    inventory_date date,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    PRIMARY KEY (id),
    FOREIGN KEY(staff_id) REFERENCES "Staff"(staff_id)
);

CREATE TABLE lease_rental_pc (
    id serial not null,
    contract_number varchar(64) not null,
    product_name varchar(64),
    os varchar(64),
    office_ver integer,
    pc_name varchar(64) not null,
    contract_start date,
    contract_end date,
    user_name varchar(64) not null,
    ip_address varchar(64),
    vpn integer,
    monthly integer,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    PRIMARY KEY (id)
);

CREATE TABLE phone_wifi (
    id serial not null,
    telephone_number varchar(64) not null,
    carrier varchar(64),
    type_tel_wifi varchar(64),
    user_name varchar(64) not null,
    model_number varchar(64),
    model_name varchar(64),
    process_name varchar(64),
    new_buy_date date,
    model_change_date date,
    buy_method varchar(64),
    buy_price integer,
    first_time_model_price integer,
    model_monthly integer,
    sharepack_entry varchar(64),
    contract_start date,
    contract_end date,
    process_req_date date,
    process_comp_date date,
    note text,
    staff_id integer not null,
    monthly integer,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    PRIMARY KEY (id),
    FOREIGN KEY(staff_id) REFERENCES "Staff"(staff_id)
);

CREATE TABLE fixed_asset (
    id serial not null,
    assets_code varchar(64) not null,
    assets_type varchar(64),
    assets_name varchar(64) not null,
    quantity integer,
    get_date date,
    common_date date,
    user_name varchar(64),
    use_place varchar(64),
    get_price integer,
    tax integer,
    tax_rate decimal,
    remain_price integer,
    repayment_method varchar(64),
    service_life integer,
    current_term_repayment integer,
    end_of_term_book_value integer,
    repayment_wbscode integer,
    repayment_wbsname varchar(64),
    other text,
    inventory_date date,
    staff_id integer not null,
    note text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    PRIMARY KEY (id),
    FOREIGN KEY(staff_id) REFERENCES "Staff"(staff_id)
);

CREATE TABLE disaster_stockpile (
    id serial not null,
    comfirm_date date,
    product_name varchar(64) not null,
    buy_quantity integer,
    boxes integer,
    stock integer,
    retailer varchar(64),
    buy_price integer,
    storage_period date,
    status varchar(64),
    storage_place varchar(64),
    note_1 text,
    note_2 text,
    new_approval_doc date,
    staff_id integer not null,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    PRIMARY KEY (id),
    FOREIGN KEY(staff_id) REFERENCES "Staff"(staff_id)
);

