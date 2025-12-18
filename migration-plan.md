# Data-Table Migration Plan

## Current State Analysis

### Two DataTable Implementations

1. **Legacy Implementation** (`components/data-table.tsx`)

   - Used by **27 files** throughout the project
   - Manages state internally (columns, data, search, sorting)
   - API: `<DataTable columns={} data={} searchableColumn={} searchableColumns={} searchPlaceholder={} />`
   - Handles filtering, sorting, and search internally

2. **New Implementation** (`components/data-table/data-table.tsx`)
   - Used by **1 file** (`app/equipments/models/page.tsx`)
   - Expects pre-configured table instance via `useDataTable` hook
   - API: `<DataTable table={} globalFilter={} setGlobalFilter={} searchPlaceholder={} />`
   - Requires external state management

### Dependencies Found

- **PaginationBar**: Used by 24+ files, no changes needed
- **useDataTable**: Used only by new pattern
- **No external package dependencies**
- **No TypeScript configuration issues**

## Migration Strategies

### Option 1: Backward-Compatible Migration (RECOMMENDED)

**Goal**: Preserve existing API while restructuring files

**Approach**:

1. Transform the new DataTable to accept both legacy and new API patterns
2. Create a compatibility layer that detects which interface is being used
3. Update imports to point to new location
4. Remove original file

**Pros**:

- ✅ Zero breaking changes
- ✅ All existing code continues to work
- ✅ Gradual migration possible
- ✅ Safer rollback

**Cons**:

- ⚠️ More complex implementation
- ⚠️ Temporary code complexity

**Files to modify**: 28 files (import statements only)

### Option 2: Breaking Change Migration

**Goal**: Standardize on new API pattern

**Approach**:

1. Update all 27 files to use new API pattern
2. Add `useDataTable` hook usage to each file
3. Update imports to new location
4. Remove original file

**Pros**:

- ✅ Clean, consistent API across codebase
- ✅ Better separation of concerns
- ✅ More maintainable long-term

**Cons**:

- ❌ Breaks 27 files (major refactoring)
- ❌ Higher risk of bugs
- ❌ Longer migration time

**Files to modify**: 28 files (imports + usage patterns)

### Option 3: Hybrid Approach

**Goal**: Keep both implementations temporarily

**Approach**:

1. Rename original to `legacy-data-table.tsx`
2. Keep both implementations available
3. Gradually migrate files to new pattern
4. Remove legacy implementation later

**Pros**:

- ✅ Allows gradual migration
- ✅ Can pause migration at any time

**Cons**:

- ❌ Maintains code duplication
- ❌ More complex long-term
- ❌ Confusing for developers

## Recommended Implementation Plan

### Phase 1: Create Compatibility Layer

1. Modify `components/data-table/data-table.tsx` to support both APIs
2. Add backward compatibility logic
3. Ensure all existing functionality preserved

### Phase 2: Update Imports

1. Generate automated script to update import statements
2. Test on subset of files first
3. Execute full migration

### Phase 3: Validation & Cleanup

1. Test all affected functionality
2. Verify no regressions
3. Remove original `components/data-table.tsx`

### Phase 4: Optional Modernization

1. Gradually update files to new API pattern
2. Remove compatibility layer when ready

## Detailed File Analysis

### Files Using Legacy Pattern (27 files)

```
app/companies/business-categories/page.tsx
app/companies/business-subcategories/page.tsx
app/companies/list/page.tsx
app/employees/categories/page.tsx
app/employees/list/page.tsx
app/employees/positions/page.tsx
app/employees/vacations/page.tsx
app/equipments/categories/page.tsx
app/equipments/list/page.tsx
app/equipments/types/page.tsx
app/settings/brands/page.tsx
app/settings/locations/page.tsx
app/settings/units/page.tsx
app/tires/inspections/page.tsx
app/tires/list/page.tsx
app/tires/models/page.tsx
app/tires/recaps/page.tsx
app/tires/rotations/page.tsx
app/tires/sizes/page.tsx
app/users/page.tsx
```

### Files Using New Pattern (1 file)

```
app/equipments/models/page.tsx ✅ Already using new pattern
```

### Unchanged Dependencies

```
components/data-table/pagination-bar.tsx ✅ No changes needed
components/data-table/use-data-table.ts ✅ No changes needed
```

## Migration Commands

### Automated Import Update Script

```bash
# Find and replace import statements
find . -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|from "@/components/data-table"|from "@/components/data-table/data-table"|g'
```

### Manual Verification Commands

```bash
# Verify no legacy imports remain
grep -r "from \"@/components/data-table\"" --include="*.tsx" --include="*.ts" .

# Verify all files can compile
npm run type-check

# Test build
npm run build
```

## Risk Assessment

### Low Risk Items

- Import path changes
- File reorganization
- PaginationBar compatibility

### Medium Risk Items

- API compatibility layer
- State management changes

### High Risk Items

- Breaking changes to 27 files
- Data flow modifications

## Success Criteria

1. ✅ All existing functionality preserved
2. ✅ No compilation errors
3. ✅ All tests pass
4. ✅ No runtime regressions
5. ✅ Clean import structure
6. ✅ Original file successfully removed

## Next Steps

1. **Choose migration strategy** (recommend Option 1)
2. **Approve detailed implementation plan**
3. **Execute Phase 1: Compatibility Layer**
4. **Test on subset of files**
5. **Execute full migration**
6. **Validate and cleanup**
