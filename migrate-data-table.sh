#!/bin/bash
# Data-Table Migration Automation Script
# This script migrates all remaining files from legacy to new DataTable pattern

set -e  # Exit on any error

echo "🚀 Starting Data-Table Migration Automation"
echo "=============================================="

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to log with color
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Files that need migration (excluding the one we already completed)
FILES_TO_MIGRATE=(
    "app/tires/rotations/page.tsx"
    "app/tires/recaps/page.tsx"
    "app/tires/models/page.tsx"
    "app/tires/list/page.tsx"
    "app/tires/inspections/page.tsx"
    
    
    
    

    "app/equipments/types/page.tsx"
    "app/equipments/categories/page.tsx"
    
    "app/employees/vacations/page.tsx"
    "app/employees/positions/page.tsx"
    "app/employees/categories/page.tsx"
    
    
)
teniendo encuenta el procedimiento anterior, vamos a migrar ahora a "app/settings/locations/page.tsx" y "sae-frontend/app/users/page.tsx"; tambien optimizar el codigo donde sea necesario, quieta el input search anteriro, sino quedan duplicados

Necesito migrar la importación del componente `sae-frontend/components/data-table.tsx` por `sae-frontend/components/data-table/data-table.tsx` en el archivo `app/equipments/list/page.tsx`.


# Function to backup a file before migration
backup_file() {
    local file="$1"
    if [ -f "$file" ]; then
        cp "$file" "${file}.backup.$(date +%Y%m%d_%H%M%S)"
        log_info "Backed up $file"
    fi
}

# Function to migrate a single file
migrate_file() {
    local file="$1"
    local filename=$(basename "$file")
    
    log_info "Processing $file..."
    
    # Check if file exists
    if [ ! -f "$file" ]; then
        log_error "File $file does not exist, skipping..."
        return 1
    fi
    
    # Check if file is already using new pattern
    if grep -q "from \"@/components/data-table/data-table\"" "$file"; then
        log_warning "$filename already migrated, skipping..."
        return 0
    fi
    
    # Backup the file
    backup_file "$file"
    
    # Apply the migration patterns
    log_info "Applying migration patterns to $filename..."
    
    # 1. Update imports
    sed -i 's|from "@/components/data-table"$|from "@/components/data-table/data-table"|g' "$file"
    sed -i 's|import { DataTable } from "@/components/data-table/data-table";|import { DataTable } from "@/components/data-table/data-table";\nimport { useDataTable } from "@/components/data-table/use-data-table";|g' "$file"
    
    # 2. Add useDataTable hook (this will need manual adjustment for searchableColumns)
    # We'll add a placeholder that can be customized
    sed -i '/const columns = useMemo/a\\n  // TanStack Table\n  const { table, globalFilter, setGlobalFilter } = useDataTable({\n    data: sizes,\n    columns,\n    searchableColumns: ["name", "code"], // TODO: Update searchable columns for this entity\n  });' "$file"
    
    # 3. Update DataTable usage (basic pattern - may need manual adjustment)
    sed -i 's|<DataTable<T[^>]*> columns={columns} data={[^}]*}>|<DataTable\n              table={table}\n              globalFilter={globalFilter}\n              setGlobalFilter={setGlobalFilter}\n              searchPlaceholder="Buscar..."\n            />|g' "$file"
    
    # 4. Remove external search state and input (basic patterns - may need manual review)
    # This is complex and file-specific, so we'll flag for manual review
    
    log_success "Applied basic migration patterns to $filename"
    log_warning "$filename may need manual review for searchableColumns and search input removal"
    
    return 0
}

# Function to validate migration
validate_migration() {
    local file="$1"
    
    log_info "Validating $file..."
    
    # Check for common issues
    if grep -q "from \"@/components/data-table\"" "$file"; then
        log_error "$file still has legacy import"
        return 1
    fi
    
    if ! grep -q "useDataTable" "$file"; then
        log_error "$file missing useDataTable hook"
        return 1
    fi
    
    log_success "$file validation passed"
    return 0
}

# Main migration process
main() {
    log_info "Starting migration of ${#FILES_TO_MIGRATE[@]} files..."
    
    local success_count=0
    local fail_count=0
    
    for file in "${FILES_TO_MIGRATE[@]}"; do
        echo
        log_info "--- Migrating $file ---"
        
        if migrate_file "$file"; then
            if validate_migration "$file"; then
                ((success_count++))
            else
                ((fail_count++))
            fi
        else
            ((fail_count++))
        fi
    done
    
    echo
    echo "=============================================="
    log_info "Migration Summary:"
    log_success "Successfully migrated: $success_count files"
    if [ $fail_count -gt 0 ]; then
        log_error "Failed: $fail_count files"
    fi
    echo "=============================================="
    
    if [ $fail_count -eq 0 ]; then
        log_success "All files migrated successfully!"
        log_info "Next steps:"
        echo "1. Review each migrated file for searchableColumns accuracy"
        echo "2. Remove any remaining external search inputs"
        echo "3. Test functionality in browser"
        echo "4. Run TypeScript compiler check"
        echo "5. Remove original data-table.tsx file"
    else
        log_warning "Some files need manual review. Check the errors above."
    fi
}

# Function to rollback all backups
rollback() {
    log_warning "Rolling back all changes..."
    find . -name "*.backup.*" -type f | while read backup; do
        original="${backup%.backup.*}"
        if [ -f "$original" ]; then
            mv "$backup" "$original"
            log_info "Restored $original"
        fi
    done
    log_success "Rollback completed"
}

# Parse command line arguments
case "${1:-}" in
    "rollback")
        rollback
        exit 0
        ;;
    "help"|"-h"|"--help")
        echo "Data-Table Migration Script"
        echo "Usage: $0 [command]"
        echo
        echo "Commands:"
        echo "  (no args)  - Run migration"
        echo "  rollback   - Restore all files from backups"
        echo "  help       - Show this help"
        echo
        echo "Files to migrate: ${#FILES_TO_MIGRATE[@]}"
        exit 0
        ;;
    "")
        main
        ;;
    *)
        log_error "Unknown command: $1"
        echo "Use '$0 help' for usage information"
        exit 1
        ;;
esac