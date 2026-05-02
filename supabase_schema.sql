-- 1. Create Companies Table (客户公司档案)
CREATE TABLE companies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  uen VARCHAR(50) NOT NULL UNIQUE,
  registered_address TEXT,
  financial_year_end VARCHAR(50), -- e.g., '31 December'
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 2. Create Directors Table (董事名册)
CREATE TABLE directors (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  full_name VARCHAR(255) NOT NULL,
  passport_number VARCHAR(100),
  nationality VARCHAR(100),
  appointment_date DATE,
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 3. Create Resolutions Table (AI 生成的决议记录)
CREATE TABLE resolutions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'Draft', -- 'Draft', 'Pending Signature', 'Completed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- 插入一些假数据，方便我们直接在网页上测试 CRM
INSERT INTO companies (name, uen, registered_address, financial_year_end)
VALUES 
  ('TechNova Pte. Ltd.', '202312345A', '123 Marina Bay Sands, Singapore 018956', '31 December'),
  ('Global Trade Corp', '202198765B', '456 Orchard Road, Singapore 238877', '30 June');

INSERT INTO directors (company_id, full_name, passport_number, nationality, appointment_date)
SELECT id, 'John Doe', 'E12345678', 'Singaporean', '2023-01-15' FROM companies WHERE uen = '202312345A';

INSERT INTO directors (company_id, full_name, passport_number, nationality, appointment_date)
SELECT id, 'Jane Smith', 'P87654321', 'American', '2021-08-01' FROM companies WHERE uen = '202198765B';
