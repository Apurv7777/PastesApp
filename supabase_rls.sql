-- Enable Row Level Security
ALTER TABLE pastes ENABLE ROW LEVEL SECURITY;

-- Create Policy: Allow Anonymous Select (Read)
-- Allows anyone with the anon key to read all pastes
CREATE POLICY "Allow Anonymous Select" 
ON pastes 
FOR SELECT 
TO anon 
USING (true);

-- Create Policy: Allow Anonymous Insert (Create)
-- Allows anyone with the anon key to create pastes
CREATE POLICY "Allow Anonymous Insert" 
ON pastes 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Create Policy: Allow Anonymous Update (Edit)
-- Allows anyone with the anon key to update pastes
CREATE POLICY "Allow Anonymous Update" 
ON pastes 
FOR UPDATE 
TO anon 
USING (true);

-- Create Policy: Allow Anonymous Delete (Remove)
-- Allows anyone with the anon key to delete pastes
CREATE POLICY "Allow Anonymous Delete" 
ON pastes 
FOR DELETE 
TO anon 
USING (true);
